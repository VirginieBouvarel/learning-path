# WSL2 + ZSH + Terminal — environnement Windows

# WSL2 + ZSH + Terminal

> À faire **avant** d'installer Java ou Node. Tout le développement se passe dans WSL2 — pas dans PowerShell ni dans cmd.
> 

---

## Étape 1 — Installer WSL2

```powershell
# Dans PowerShell en administrateur
wsl --install
# Redémarre Windows quand demandé
```

Si WSL est déjà installé mais en version 1 :

```powershell
wsl --set-default-version 2
wsl --update
```

Installe Ubuntu 22.04 LTS depuis le Microsoft Store si ce n'est pas fait automatiquement.

Vérification :

```powershell
wsl -l -v
# Ubuntu   Running   2   ← la version doit être 2
```

### Configurer les ressources WSL2

Crée `C:\Users\<ton-nom>\.wslconfig` :

```
[wsl2]
memory=8GB
processors=4
swap=2GB
```

Ajuste selon ta machine. Relève WSL2 : `wsl --shutdown` puis rouvre Ubuntu.

---

## Étape 2 — Mise à jour Ubuntu

Dans Ubuntu :

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git build-essential
```

---

## Étape 3 — Installer ZSH + Oh My Zsh

```bash
# Installer ZSH
sudo apt install -y zsh

# Installer Oh My Zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Définir ZSH comme shell par défaut
chsh -s $(which zsh)
```

Ferme et rouvre le terminal. Tu devrais voir le prompt Oh My Zsh.

---

## Étape 4 — Plugins essentiels

```bash
# zsh-autosuggestions (suggestions depuis l'historique)
git clone https://github.com/zsh-users/zsh-autosuggestions \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# zsh-syntax-highlighting (commandes en couleur)
git clone https://github.com/zsh-users/zsh-syntax-highlighting \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

Édite `~/.zshrc` et modifie la ligne `plugins=` :

```bash
plugins=(
  git
  docker
  node
  zsh-autosuggestions
  zsh-syntax-highlighting
)
```

```bash
source ~/.zshrc
```

---

## Étape 5 — Thème Powerlevel10k (optionnel mais recommandé)

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \
  ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

Dans `~/.zshrc` : `ZSH_THEME="powerlevel10k/powerlevel10k"`

`source ~/.zshrc` — le configurateur se lance automatiquement.

> **Pourquoi Powerlevel10k ?** Il affiche la branche git, le status des fichiers modifiés, la version Java/Node active, et le temps d'exécution des commandes. Tu vois en permanence dans quel contexte tu travailles.
> 

---

## Étape 6 — Configurer Git dans WSL2

```bash
git config --global user.name "Ton Prénom Nom"
git config --global user.email "ton@email.com"
git config --global core.editor "code --wait"  # ou vim si tu préfères
git config --global init.defaultBranch main

# Générer une clé SSH pour GitLab
ssh-keygen -t ed25519 -C "ton@email.com"
cat ~/.ssh/id_ed25519.pub
# Copie cette clé dans GitLab → Profile → SSH Keys
```

---

## Étape 7 — Accès aux fichiers Windows depuis WSL2

Tes fichiers Windows sont accessibles dans WSL2 via `/mnt/c/` (ou `/mnt/d/`, etc.).

> **Règle de performance** : **mets toujours ton projet dans le système de fichiers Linux** (`~/projects/katasensei`), jamais dans `/mnt/c/`. Les performances d'accès aux fichiers depuis WSL2 vers Windows sont 10x plus lentes.
> 

```bash
mkdir -p ~/projects
cd ~/projects
# C'est ici que tu cloneras KataSensei
```

---

## Checklist

- [ ]  `wsl -l -v` montre Ubuntu en version 2
- [ ]  `.wslconfig` configuré avec les ressources
- [ ]  ZSH installé et défini comme shell par défaut
- [ ]  Oh My Zsh installé
- [ ]  Plugins zsh-autosuggestions + zsh-syntax-highlighting actifs
- [ ]  Git configuré avec nom, email, clé SSH
- [ ]  Clé SSH ajoutée dans GitLab
- [ ]  Projet KataSensei sera dans `~/projects/` (pas dans `/mnt/c/`)

---

## Mes notes

*(Ajoute ici tes blocages, questions, liens utiles, découvertes)*