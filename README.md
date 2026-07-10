# Phone Timer

A simple static web app for speakers to see a large, flashing countdown timer from a distance on a phone.

## Features

- Set minutes and seconds
- Tap **Flash** to start a full-screen countdown
- Large landscape-style display that rotates automatically on portrait phones
- Flashing display option
- Color changes to yellow (≤30s) and red (≤10s)
- Pause/Resume and Reset controls
- Double-tap the timer to toggle fullscreen
- Works offline via a service worker

## GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch** and choose `main` / `root`.
4. Your site will be available at `https://<username>.github.io/phone-timer`.

## Offline support

The app uses a service worker to work offline. Service workers require the site to be served over `http://`, `https://`, or `localhost`. They will not work if you open `index.html` directly from your file system (`file://`).
