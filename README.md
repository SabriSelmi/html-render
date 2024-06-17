# HTML Render Web Service

## Prérequis

1. **Vérifiez que Git est installé sur votre machine :**

`bash git --version`

2. **Vérifiez que Node.js version 21 est installé sur votre machine :**

`bash node --version`

## Installation

1. Clonez le dépôt :

`bash git clone https://github.com/SabriSelmi/html-render.git`

2. Accédez au répertoire du projet :

`bash cd html-render`

3. Installez les dépendances :

`bash npm install`

## Lancer le Service

1. Démarrez le service :

`bash node .`

Par défaut, le service sera exécuté sur le port 3000.

2. Si vous souhaitez changer le port, modifiez-le dans le fichier `index.js`.

## Utilisation

Pour utiliser le service, envoyez une requête POST à l'endpoint `/scrape` en mettant l'URL dans le corps de la requête.

### Exemple de Requête POST

`http
POST http://localhost:3000/scrape
Content-Type: application/json

{
\"url\": \"https://www.jobteaser.com/fr/job-offers/b3f23615-5fde-4d3e-898a-046581e4b619-intermarche-netto-stage-category-manager-netto-h-f\"
}
`

### Réponse

La réponse contiendra le contenu HTML de la page spécifiée.

<!DOCTYPE html><html>...</html>

## Notes

- Assurez-vous que l'URL fournie dans la requête POST est valide et accessible.
- Le service utilise Puppeteer pour rendre la page, donc il peut y avoir un certain délai en fonction de la complexité de la page et de la vitesse de votre connexion internet.

**TESTED LIST :**
Indeed : passed ✅
Jobteaser : passed ✅
Linkedin : passed ✅
welcometothejungle : passed ✅
la relève : failed ❎
HelloWork : passed ✅
l'apec : passed ✅
StationF jobs : passed ✅
la bonne alternance : failed ❎

Les tests échouent à cause du site qui ne fournit pas des URLs uniques pour les offres. Le site utilise un routage basé sur l'état de l'application au lieu d'un véritable routage.
