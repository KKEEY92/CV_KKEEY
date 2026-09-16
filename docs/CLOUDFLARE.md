# kkeey.dev — GitHub Pages + Cloudflare Proxy

Origin: GitHub Pages (`KKEEY92/CV_KKEEY`, CNAME `kkeey.dev`)
Edge: Cloudflare Zone `kkeey.dev`, Proxy **an** (orange Wolke)

`aria.kkeey.dev` bleibt Cloudflare Pages — diesen Record nicht auf GitHub umbiegen.

## SSL/TLS (sonst Redirect-Loop)

Dashboard → Zone kkeey.dev → SSL/TLS:

- Encryption mode: **Full** (besser: **Full (strict)**)
- Always Use HTTPS: **On**
- Minimum TLS: 1.2
- **Nicht** Flexible — GitHub redirected HTTP→HTTPS, CF würde loopen

## DNS Records

Alle mit Proxy **an**, außer wo anders vermerkt.

| Type | Name | Inhalt | Proxy |
|---|---|---|---|
| CNAME | `www` | `kkeey92.github.io` | orange |
| CNAME | `@` | `kkeey92.github.io` | orange (CNAME Flattening) |
| CNAME | `aria` | bestehendes Pages-Target (`*.pages.dev`) | orange, **nicht anfassen** |

Alternative statt Apex-CNAME — vier A + vier AAAA, ebenfalls proxied:

```
A     @   185.199.108.153
A     @   185.199.109.153
A     @   185.199.110.153
A     @   185.199.111.153
AAAA  @   2606:50c0:8000::153
AAAA  @   2606:50c0:8001::153
AAAA  @   2606:50c0:8002::153
AAAA  @   2606:50c0:8003::153
```

Alte graue A-Records auf dieselben IPs löschen oder auf orange stellen. Doppelte Records vermeiden.

## Check

```bash
curl -sI https://kkeey.dev | rg -i 'cf-ray|server|cf-cache'
```

Erwartet: `cf-ray` gesetzt, `server: cloudflare`. Origin dahinter bleibt GitHub Pages.

`aria.kkeey.dev` muss weiter `cf-ray` liefern und die Aria-App zeigen.
