# ⚡ ÉlectroPro — Site Vitrine

Site vitrine professionnel pour une entreprise d'électricité.
Design moderne, responsive, prêt à déployer.

---

## 📁 Structure des fichiers

```
electropro/
├── index.html      ← Page principale (toutes sections)
├── styles.css      ← Feuille de styles complète
├── script.js       ← JavaScript (interactions, formulaire)
└── README.md       ← Ce fichier
```

---

## 🚀 Lancer le site localement

### Option A — Ouvrir directement
Double-cliquez sur `index.html` dans votre explorateur de fichiers.

### Option B — Serveur local (recommandé)
```bash
# Python 3
python3 -m http.server 8080
# puis ouvrir http://localhost:8080

# Node.js (npx)
npx serve .
```

---

## ✏️ Personnalisation

### Informations à remplacer

| Élément | Où | Valeur à remplacer |
|---|---|---|
| Nom entreprise | `index.html` | `ÉlectroPro` → votre nom |
| Téléphone | `index.html` | `06 00 00 00 00` |
| Email | `index.html` | `contact@electropro.fr` |
| Ville | `index.html` | Zone d'intervention |
| Photo équipe | `index.html` | Remplacer le bloc `.about-img-placeholder` par une `<img>` |
| Google Maps | `index.html` | Mettre à jour le `src` de l'iframe avec votre adresse |

### Couleurs (fichier `styles.css`)
```css
:root {
  --navy:     #0A1628;   /* Fond sombre */
  --blue:     #1E3A8A;   /* Bleu principal */
  --blue-mid: #2563EB;   /* Bleu accent */
  --yellow:   #F59E0B;   /* Jaune électricité */
}
```

### Google Maps personnalisé
1. Aller sur [maps.google.com](https://maps.google.com)
2. Chercher votre adresse
3. Cliquer sur **Partager → Intégrer une carte**
4. Copier le code `<iframe src="...">` et remplacer celui dans `index.html`

---

## 📬 Connecter le formulaire

Le formulaire est fonctionnel côté frontend. Pour recevoir les messages par email, plusieurs options :

### Option 1 — Formspree (gratuit, sans backend)
```html
<form action="https://formspree.io/f/VOTRE_ID" method="POST">
```
→ Créer un compte sur [formspree.io](https://formspree.io)

### Option 2 — Netlify Forms (si hébergé sur Netlify)
```html
<form name="contact" netlify>
```

### Option 3 — Backend Node.js/PHP
Décommenter et adapter le bloc `fetch('/api/contact', ...)` dans `script.js`.

---

## 🌐 Déploiement

### Netlify (recommandé, gratuit)
1. Créer un compte sur [netlify.com](https://netlify.com)
2. Glisser-déposer le dossier sur l'interface Netlify
3. Votre site est en ligne en 30 secondes ✅

### OVH / Hébergement classique
Uploader les 3 fichiers via FTP dans le dossier `public_html/`

### GitHub Pages
1. Créer un repo GitHub
2. Pousser les fichiers
3. Activer GitHub Pages dans les réglages

---

## ✅ Checklist avant mise en ligne

- [ ] Remplacer le nom de l'entreprise
- [ ] Mettre à jour le téléphone et l'email
- [ ] Adapter la zone d'intervention
- [ ] Ajouter une vraie photo d'équipe
- [ ] Configurer Google Maps avec la vraie adresse
- [ ] Connecter le formulaire (Formspree ou autre)
- [ ] Ajouter un vrai favicon (`<link rel="icon">`)
- [ ] Vérifier le rendu mobile
- [ ] Ajouter Google Analytics si souhaité

---

*Site créé avec HTML, CSS et JavaScript vanilla — aucune dépendance externe.*
