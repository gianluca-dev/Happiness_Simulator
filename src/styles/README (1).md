# SCSS Struktur - Anleitung

## 📁 Dateistruktur

```
styles/
├── main.scss              ← Hauptdatei (alle Imports hier!)
├── _variables.scss        ← Farben, Größen, Abstände
├── _darkmode.scss         ← Dark Mode (optional)
├── _header.scss           ← Header & Navigation
├── _buttons.scss          ← Alle Button-Styles
├── _styles.scss           ← Main, Footer, Content
└── _responsive.scss       ← Media Queries
```

## 🔄 Import-Reihenfolge (WICHTIG!)

Die Reihenfolge in `main.scss` ist entscheidend:

1. **_variables.scss** - Zuerst, da andere Dateien die Variablen brauchen
2. **_darkmode.scss** - Dark Mode
3. **_header.scss**, **_buttons.scss** - Komponenten
4. **_styles.scss** - Allgemeine Styles
5. **_responsive.scss** - Media Queries zuletzt

## 🛠️ SCSS Kompilieren

### Option A: VS Code Extension (am einfachsten)

1. Installiere "Live Sass Compiler" von Ritwick Dey
2. Rechtsklick auf `main.scss` → **"Watch Sass"**
3. Die Extension erstellt automatisch `main.css` bei jeder Änderung
4. Im HTML: `<link rel="stylesheet" href="styles/main.css">`

### Option B: Command Line

```bash
# Installation (einmalig)
npm install -g sass

# Einmalig kompilieren
sass styles/main.scss styles/main.css

# Automatisch überwachen
sass --watch styles:styles
```

### Option C: Node.js Projekt

Wenn du Node.js nutzt, füge in `package.json` ein:

```json
{
  "scripts": {
    "sass": "sass styles/main.scss styles/main.css",
    "sass:watch": "sass --watch styles:styles"
  }
}
```

Dann:
```bash
npm run sass:watch
```

## 📝 HTML Verwendung

Du brauchst **nur eine CSS-Datei** im HTML:

```html
<head>
  <link rel="stylesheet" href="styles/main.css">
</head>
```

## ✨ SCSS Features, die du jetzt nutzen kannst

### Variablen überall:
```scss
background-color: $primary-component-bg-color;
padding: $spacing-large;
border-radius: $border-radius-small;
```

### Verschachtelung:
```scss
.header {
  background-color: $secondary-component-bg-color;

  .logo {
    width: 50px;
  }

  a {
    &:hover {
      color: blue;
    }
  }
}
```

### Transitions & Animationen:
```scss
transition: $transition-default;  // statt immer neu schreiben
```

## 🎨 Neue Styles hinzufügen

### Neuen Button-Style?
→ In `_buttons.scss` hinzufügen

### Neue Farbe?
→ In `_variables.scss` als Variable hinzufügen

### Mobile-Styles?
→ In `_responsive.scss` in die `@media` Query

## ⚠️ Häufige Fehler

❌ **FALSCH:**
```scss
color: var($primary-color);  // Das ist falsch!
```

✅ **RICHTIG (SCSS):**
```scss
color: $primary-color;  // Ohne var()!
```

## 🔍 Debugging

Wenn die Styles nicht laden:

1. Hast du `main.scss` zu CSS kompiliert?
2. Zeigt der Browser `main.css` in den Dev Tools unter Network/Sources?
3. Keine Fehler in der Browser-Console?

---

Viel Erfolg! 🚀 Wenn Fragen auftauchen, schreib mir!
