# Experiment met Dialog situaties

Deze repository bevat enkele experimenten die zijn gemaakt tijdens de NL Design System Estafettemodeldag van 28 november 2025: [index.html](index.html).

Daarnaast zijn er enkele custom elements ontwikkeld die ook op andere plekken gebruikt kunnen worden.

## `<outer-html>` custom element

Er is een custom element gemaakt waarmee je real-time de inhoud van een HTML-element op de pagina kan tonen.

Op dit moment is de component hardcoded met alleen de HTML formatter.

Voeg het op deze manier toe aan je pagina:

```html
<script type="module" src="outer-html-element.mjs"></script>
```

Voorbeeld:

```html
<pre><code><outer-html ref=":root"></outer-html></code></pre>
```

## `<prettier-formatting>` custom element

Er is een custom element gemaakt waarmee je de inhoud van een element automatisch kan tonen met prettier formatting.

Op dit moment is de component hardcoded met alleen de HTML formatter.

Voeg het op deze manier toe aan je pagina:

```html
<script type="module" src="prettier-fomatting-element.mjs"></script>
```

Voorbeeld:

```html
<pre><code><prettier-formatting>&lt;!DOCTYPE html>
&lt;html lang="nl" dir="ltr">
  &lt;head>
    &lt;title>NL Design System&lt;/title>
    &lt;meta charset="utf-8"/>
  &lt;/head>
  &lt;body>
    &lt;h1>NL Design System&lt;/h1>
  &lt;/body>
&lt;/html></prettier-formatting></code></pre>
```

Je kunt het `prettier-formatting` element ook combineren met het `outer-html` element, om live de HTML te tonen van een element op de pagina.

```html
<div contenteditable="true">
  <p>Voorbeeld HTML content</p>
</div>
<pre><code><prettier-formatting><outer-html ref="[contenteditable=true]"></outer-html></prettier-formatting></code></pre>
```
