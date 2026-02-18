# 🚚 Application de gestion de flotte de camions

Application web de **suivi des trajets, du carburant et de la maintenance** pour une flotte de camions et remorques.  
Ce projet vise à digitaliser et centraliser la gestion d’une entreprise de transport routier.

---

## 📌 Contexte du projet

Une entreprise de transport gère sa flotte de manière manuelle (Excel, documents papier, appels téléphoniques), ce qui entraîne :

- ❌ Manque de visibilité en temps réel sur les trajets
- ❌ Difficulté de suivi du kilométrage
- ❌ Suivi imprécis de la consommation de carburant
- ❌ Gestion approximative des pneus et de la maintenance
- ❌ Absence de centralisation des données chauffeurs et trajets

Cette application apporte une **solution numérique complète**, centralisée et sécurisée.

---

## 🎯 Objectifs

- Centraliser la gestion des camions, remorques et chauffeurs
- Suivre les trajets, le kilométrage et la consommation de gasoil
- Planifier et notifier les opérations de maintenance
- Sécuriser l’accès selon le rôle utilisateur (Admin / Chauffeur)

---

## 🧩 Fonctionnalités principales

### 🔹 Gestion des ressources
- Camions
- Remorques
- Pneus
- Carburant

### 🔹 Gestion des trajets
- Création et assignation aux chauffeurs
- Suivi du statut :  
  `À faire` → `En cours` → `Terminé`
- Téléchargement du trajet en **PDF (ordre de mission)**

### 🔹 Suivi technique
- Kilométrage départ / arrivée
- Consommation de gasoil
- État des pneus
- Historique de maintenance

### 🔹 Maintenance
- Configuration des règles de maintenance
- Planification automatique (vidange, pneus, révision)
- Notifications

---

## 👥 Rôles et permissions

### 🛠️ Admin
- Gérer camions, remorques et pneus
- Créer et assigner les trajets
- Consulter les rapports (consommation, maintenance, kilométrage)
- Configurer les règles de maintenance

### 🚛 Chauffeur
- Consulter ses trajets assignés
- Télécharger le trajet en PDF
- Mettre à jour le statut du trajet
- Saisir :
  - Kilométrage départ / arrivée
  - Volume de gasoil
  - Remarques sur l’état du véhicule

---

## 🏗️ Architecture du projet

