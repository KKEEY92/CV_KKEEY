"""Static markup/resource checks; browser accessibility and visual QA remain separate."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}

class Markup(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.ids = set()
        self.links = []
        self.resources = []

    def handle_starttag(self, tag, pairs):
        attrs = dict(pairs)
        if tag not in VOID:
            self.stack.append(tag)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, f'Duplicate ID: {attrs["id"]}'
            self.ids.add(attrs['id'])
        if tag == 'a':
            self.links.append(attrs.get('href', ''))
        if tag in {'script', 'img', 'link'}:
            resource = attrs.get('src') if tag != 'link' else attrs.get('href')
            if resource and attrs.get('rel') != 'canonical':
                self.resources.append(resource)

    def handle_endtag(self, tag):
        assert self.stack and self.stack[-1] == tag, f'Unbalanced closing tag: {tag}, stack: {self.stack}'
        self.stack.pop()

markup = Markup()
markup.feed((ROOT / 'agent-os.html').read_text())
assert not markup.stack, f'Unclosed tags: {markup.stack}'
for link in markup.links:
    url = urlsplit(link)
    if url.scheme:
        continue
    target = ROOT / (url.path or 'agent-os.html')
    assert target.is_file(), f'Missing linked file: {target}'
    if url.fragment:
        other = Markup()
        other.feed(target.read_text())
        assert url.fragment in other.ids, f'Missing anchor: {link}'
for resource in markup.resources:
    url = urlsplit(resource)
    assert not url.scheme and not url.netloc, f'External dependency: {resource}'
    assert (ROOT / url.path).is_file(), f'Missing resource: {resource}'

ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
sitemap = ET.parse(ROOT / 'sitemap.xml')
assert [loc.text for loc in sitemap.findall('.//s:loc', ns)].count('https://kkeey.dev/agent-os.html') == 1

files = sorted(Path('/private/tmp/agent-os-qa').glob('diagram-*.svg'))
assert len(files) == 40, 'Run node scripts/test-agent-os.mjs first'
svg = '{http://www.w3.org/2000/svg}'
xhtml = '{http://www.w3.org/1999/xhtml}'
for file in files:
    diagram = ET.parse(file)
    width, height = (float(diagram.getroot().get(key)) for key in ['width', 'height'])
    foreign = diagram.findall(f'.//{svg}foreignObject')
    assert len(foreign) == 23
    for node in foreign:
        x, y, w, h = (float(node.get(key)) for key in ['x', 'y', 'width', 'height'])
        assert 0 <= x < x+w <= width and 0 <= y < y+h <= height, f'Out of bounds: {file.name}'
    buttons = diagram.findall(f'.//{xhtml}button')
    assert len(buttons) == 7
    ids = {node.get('id') for node in diagram.iter() if node.get('id')}
    assert sum(node.get('id') is not None for node in diagram.iter()) == len(ids)
    for node in buttons:
        assert node.get('aria-controls') in ids
        assert node.get('aria-pressed') in {'true', 'false'}
    for node in diagram.iter():
        for ref in (node.get('aria-labelledby') or '').split():
            assert ref in ids, f'Missing label target: {ref}'
print('PASS: HTML tags balanced; IDs unique; local resources and link anchors exist; no external runtime dependencies.')
print('PASS: sitemap XML and all 40 generated SVG/XHTML diagrams parse; nodes within bounds; accessible control references resolve.')
print('LIMIT: coordinate checks cannot establish text fit, computed contrast, screen-reader behavior or browser rendering.')
