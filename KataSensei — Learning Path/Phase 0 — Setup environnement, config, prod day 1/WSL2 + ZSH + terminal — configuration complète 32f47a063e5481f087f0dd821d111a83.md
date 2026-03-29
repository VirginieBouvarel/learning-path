# WSL2 + ZSH + terminal — configuration complète

# WSL2 + ZSH — configuration complète

> À faire en premier, avant toute installation Java ou Node. Ton terminal est ton environnement de travail — un bon terminal change radicalement le confort de développement.
> 

**Durée estimée : ~45 min**

---

## Étape 1 — Installer WSL2

```powershell
# Dans PowerShell en administrateur
wsl --install
# Redémarre Windows quand demandé
# Ubuntu sera installé par défaut
```

Après redémarrage, Ubuntu s'ouvre et te demande un nom d'utilisateur et un mot de passe.

Vérification :

```powershell
# Dans PowerShell
wsl --list --verbose
# Ubuntu   Running   2   ← WSL2 confirmé
```

> **Pourquoi WSL2 ?** Tu travailles sur Windows mais tous les outils de développement (Java, Node, Docker, Git) fonctionnent infiniment mieux sur Linux. WSL2 te donne un vrai noyau Linux sans quitter Windows.
> 

---

## Étape 2 — Mettre à jour Ubuntu

```bash
# Dans le terminal Ubuntu
sudo apt update && sudo apt upgrade -y
```

---

## Étape 3 — Installer ZSH

```bash
sudo apt install zsh -y
zsh --version
# zsh 5.x.x
```

---

## Étape 4 — Oh My Zsh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
# Répond 'y' pour faire de ZSH ton shell par défaut
```

---

## Étape 5 — Powerlevel10k (thème recommandé)

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \
  ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

Édite `~/.zshrc` :

```bash
ZSH_THEME="powerlevel10k/powerlevel10k"
```

Relance le terminal — l'assistant de configuration de Powerlevel10k se lance automatiquement.

---

## Étape 6 — Plugins ZSH utiles

```bash
# zsh-autosuggestions — suggestions basées sur l'historique
git clone https://github.com/zsh-users/zsh-autosuggestions \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# zsh-syntax-highlighting — colore les commandes
git clone https://github.com/zsh-users/zsh-syntax-highlighting \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

Dans `~/.zshrc` :

```bash
plugins=(git zsh-autosuggestions zsh-syntax-highlighting node npm)
```

```bash
source ~/.zshrc
```

---

## Étape 7 — Configurer Git

```bash
git config --global user.name "Ton Prénom Nom"
git config --global user.email "ton@email.com"
git config --global core.editor "code --wait"
git config --global init.defaultBranch main
```

---

## Étape 8 — Configurer le terminal Windows Terminal

Installe [Windows Terminal](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701) depuis le Microsoft Store si ce n'est pas déjà fait.

Dans les paramètres Windows Terminal :

- Profil par défaut : Ubuntu
- Police : [MesloLGS NF](https://github.com/romkatv/powerlevel10k#meslo-nerd-font-patched-for-powerlevel10k) (requis pour Powerlevel10k)

---

## Checkpoint

- [ ]  `wsl --list --verbose` montre Ubuntu en WSL2
- [ ]  ZSH est le shell par défaut
- [ ]  Oh My Zsh installé
- [ ]  Powerlevel10k configuré
- [ ]  `git config --list` montre ton nom et email
- [ ]  Windows Terminal ouvert sur Ubuntu par défaut