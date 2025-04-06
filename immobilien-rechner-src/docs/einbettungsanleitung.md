# Anleitung zur Einbettung des Immobilien-Wirtschaftlichkeitsrechners

Diese Anleitung beschreibt, wie Sie den Immobilien-Wirtschaftlichkeitsrechner in Ihre eigene Webseite einbetten können. Es gibt verschiedene Möglichkeiten der Integration, je nach Ihren technischen Anforderungen und Ihrer bestehenden Webseite.

## Inhaltsverzeichnis

1. [Voraussetzungen](#voraussetzungen)
2. [Option 1: Vollständige Integration als React/Next.js-Komponente](#option-1-vollständige-integration-als-reactnextjs-komponente)
3. [Option 2: Integration als iFrame](#option-2-integration-als-iframe)
4. [Option 3: Deployment als eigenständige Anwendung](#option-3-deployment-als-eigenständige-anwendung)
5. [Anpassung des Designs](#anpassung-des-designs)
6. [Häufig gestellte Fragen](#häufig-gestellte-fragen)

## Voraussetzungen

Je nach gewählter Integrationsmethode benötigen Sie unterschiedliche Voraussetzungen:

- Grundlegende Kenntnisse in HTML und CSS
- Für Option 1: Kenntnisse in React und/oder Next.js
- Für Option 3: Zugriff auf einen Webserver oder Cloud-Hosting-Dienst

## Option 1: Vollständige Integration als React/Next.js-Komponente

Diese Option ist ideal, wenn Ihre Webseite bereits mit React oder Next.js entwickelt wurde.

### Schritt 1: Projektdateien kopieren

Kopieren Sie die folgenden Verzeichnisse und Dateien in Ihr bestehendes Projekt:

```
/src/components/
/src/lib/
```

### Schritt 2: Abhängigkeiten installieren

Stellen Sie sicher, dass Ihr Projekt die folgenden Abhängigkeiten enthält:

```bash
npm install recharts tailwindcss class-variance-authority clsx tailwind-merge lucide-react @radix-ui/react-label @radix-ui/react-select @radix-ui/react-slider
```

### Schritt 3: Komponente in Ihre Seite einbinden

Importieren Sie die Hauptkomponente in Ihre Seite:

```jsx
import ImmobilienRechner from './pfad/zu/ImmobilienRechner';

// In Ihrer Komponente oder Seite:
export default function MeineSeite() {
  return (
    <div>
      <h1>Meine Immobilien-Webseite</h1>
      <ImmobilienRechner />
    </div>
  );
}
```

### Schritt 4: Tailwind CSS konfigurieren

Wenn Sie Tailwind CSS bereits verwenden, stellen Sie sicher, dass Ihre Konfiguration die neuen Komponenten berücksichtigt:

```js
// tailwind.config.js
module.exports = {
  content: [
    // Ihre bestehenden Pfade
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  // Rest Ihrer Konfiguration
};
```

## Option 2: Integration als iFrame

Diese Option ist am einfachsten zu implementieren und erfordert keine speziellen Kenntnisse in React oder Next.js.

### Schritt 1: Rechner als eigenständige Anwendung deployen

Folgen Sie den Anweisungen in [Option 3](#option-3-deployment-als-eigenständige-anwendung), um den Rechner als eigenständige Anwendung zu deployen.

### Schritt 2: iFrame in Ihre Webseite einbinden

Fügen Sie folgenden HTML-Code an der Stelle ein, wo der Rechner erscheinen soll:

```html
<iframe 
  src="https://ihre-domain.de/immobilien-rechner" 
  width="100%" 
  height="800px" 
  frameborder="0" 
  scrolling="auto">
</iframe>
```

Passen Sie die Höhe und Breite nach Bedarf an.

## Option 3: Deployment als eigenständige Anwendung

Diese Option ist ideal, wenn Sie den Rechner als separate Anwendung betreiben möchten.

### Schritt 1: Projekt für die Produktion bauen

```bash
cd immobilien-wirtschaftlichkeit-app
npm run build
```

### Schritt 2: Deployment auf einem Webserver

#### Variante A: Statisches Hosting (z.B. Netlify, Vercel)

1. Erstellen Sie ein Konto bei einem Hosting-Anbieter wie Netlify oder Vercel
2. Verbinden Sie Ihr GitHub-Repository oder laden Sie den Build-Ordner hoch
3. Folgen Sie den Anweisungen des Anbieters für das Deployment

#### Variante B: Eigener Webserver

1. Übertragen Sie den Inhalt des `.next`-Ordners auf Ihren Webserver
2. Konfigurieren Sie Ihren Webserver (Apache, Nginx) entsprechend

```nginx
# Beispiel für Nginx-Konfiguration
server {
    listen 80;
    server_name immobilien-rechner.ihre-domain.de;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

3. Starten Sie die Next.js-Anwendung auf Ihrem Server:

```bash
npm start
```

### Schritt 3: Link zu Ihrer Webseite hinzufügen

Fügen Sie einen Link zu Ihrer Hauptwebseite hinzu:

```html
<a href="https://immobilien-rechner.ihre-domain.de" target="_blank">
  Zum Immobilien-Wirtschaftlichkeitsrechner
</a>
```

## Anpassung des Designs

Sie können das Design des Rechners an Ihre Webseite anpassen:

### Farben anpassen

Bearbeiten Sie die Tailwind-Konfiguration:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#IHRE-HAUPTFARBE',
          foreground: '#IHRE-TEXTFARBE',
        },
        // Weitere Farbanpassungen
      },
    },
  },
};
```

### Logo und Branding

Ersetzen Sie das Logo und passen Sie die Texte an:

1. Ersetzen Sie die Datei `/public/logo.png` mit Ihrem eigenen Logo
2. Passen Sie die Texte in den Komponenten an Ihr Branding an

## Häufig gestellte Fragen

### Kann ich den Rechner in WordPress einbinden?

Ja, verwenden Sie dafür Option 2 (iFrame-Integration) oder installieren Sie ein Plugin, das React-Komponenten in WordPress ermöglicht.

### Wie kann ich zusätzliche Funktionen hinzufügen?

Der Quellcode ist modular aufgebaut. Sie können neue Komponenten in `/src/components/` hinzufügen und bestehende Berechnungen in `/src/lib/berechnungen.ts` erweitern.

### Ist der Rechner für mobile Geräte optimiert?

Ja, der Rechner verwendet ein responsives Design und passt sich automatisch an verschiedene Bildschirmgrößen an.

### Werden die Daten der Nutzer gespeichert?

In der Standardkonfiguration werden alle Daten nur lokal im Browser des Nutzers gespeichert und nicht an einen Server übertragen. Wenn Sie eine Speicherfunktion implementieren möchten, müssen Sie eine entsprechende Backend-Lösung entwickeln.

---

Bei weiteren Fragen zur Integration stehe ich Ihnen gerne zur Verfügung.
