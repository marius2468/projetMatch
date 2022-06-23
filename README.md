# Projet Match

Projet Match est un projet de réservation de matchs sportif. Ce projet a été effectué dans le cadre de nos études à l'école d'ingénieur ISEN. Le but est d'utiliser toutes les compétences et les languages de programmation appris ces deux années en CIR (Cycle Informatique et Réseau).

Ce projet a été résalisé par **ROGERIEUX Maxence** et **FREMOND Marius** du lundi 13 juin 2022 au vendredi 24 juin 2022.

## Langages, Framework, SGBD et Data
>
> ### Languages
> 
> Durant ce projet nous avons principalement utilisé :
> - `Php` (utilisé comme API REST)
> - `JavaScript`
> - `HTML`
> - `SCSS` (Super CSS)
> - `CSS`
> 
> ### Framework
> 
> Pour ce projet nous avons utilisé deux framework différents :
> - `Bootstraap` (nous avons modifier le SCSS de bootstrap pour le personnaliser)
> - `jQuery` (pour ne pas utiliser le JavaScript Vanilla)
> 
> ### SGBD
> 
> Pour ce projet nous avons utilisé le SGBD `PostgreSQL`.
> 
> ### Data
> 
> Pour ce projet nous avons utilisé le site [mockaroo](www.mockaroo.com) pour générer des données cohérente en `SQL`.

## Version
> 
> - `Apache` *Version* 2
> - `PHP` *Version* 7.4
> - `PostgreSQL` *Version* 13

## Login / Password
>
> Ci-dessous quelques couple login/mdp intérressant pour voir le bon fonctionnement du site web.
> 
> ### Organisateur
> - jmegson0@squarespace.com / *y9n2fo*
> - bpipworth1@addtoany.com / *fb7ZSMUoB2*
> 
> ### Joueur
> - asteptowe5k@princeton.edu / *9Mcw1V*
> - mcasaccia5l@aol.com / *KH8MX2v*

## API
>
> ### Arborescence
> Voici l'arborescence du projet. Nous avons fais le choix de séparer un maximum les fichiers afin d'avoir un code lisible et évolutif.

```bash
├── css
├── html
│   ├── connection.html
│   ├── futureMatch.html
│   ├── matchCreation.html
│   ├── matchSelected.html
│   ├── modifProfile.html
│   ├── notifsOrga.html
│   ├── passedMatch.html
│   ├── profile.html
│   ├── register.html
│   ├── searchMatch.html
│   ├── statForm.html
│   └── statOrga.html
├── img
├── js
│   ├── ajax.js
│   ├── connection.js
│   ├── createMatch.js
│   ├── createPerson.js
│   ├── getPerson.js
│   ├── matchDetails.js
│   ├── matchFuture.js
│   ├── matchPassed.js
│   ├── nav.js
│   ├── notifsOrga.js
│   ├── searchMatch.js
│   ├── session.js
│   ├── statForm.js
│   ├── statOrga.js
│   └── updatePerson.js
├── php
│   ├── config
│   │   └── Database.php
│   ├── libraries
│   │   ├── getSession.php
│   │   ├── Match
│   │   │   ├── createMatch.php
│   │   │   ├── getMatchPassedFuture.php
│   │   │   ├── getMatch.php
│   │   │   ├── getMatchs.php
│   │   │   ├── getStats.php
│   │   │   └── updateMatch.php
│   │   ├── Notification
│   │   │   ├── createNotification.php
│   │   │   ├── deleteNotification.php
│   │   │   ├── getNotification.php
│   │   │   └── updateNotification.php
│   │   └── Person
│   │       ├── connection.php
│   │       ├── createPerson.php
│   │       ├── disconnect.php
│   │       ├── getPerson.php
│   │       └── updatePerson.php
│   └── models
│       ├── Match.php
│       ├── Notification.php
│       └── Person.php
├── README.md
├── scss
└── sql
    ├── create.sql
    └── insert.sql
```
> ### Request
>
> 
>
> | Method | File | Parameters | Return |
> | :---: | :---: | :---: | :---: |
> | ![POST][POST] | /Match/createMatch.php | `address`, `date_time`, `price`, `id_sport`, `id_city`, `duration`, `id_person` | Boolean |
> | ![GET][GET] | /Match/getMatch.php | `id_match` | Match |
> | ![GET][GET] | /Match/getMatchPassedFuture.php | `id_person`, `passed` | Matchs |
> | ![GET][GET] | /Match/getMatchs.php | `period`, `id_sport`, `id_city`, `complete` | Matchs |
> | ![GET][GET] | /Match/getStats |`id_person`| Matchs |
> | ![PUT][PUT] | /Match/updateMatch.php | `id_match`, `id_person`, `score` | Boolean |
> | ![POST][POST] | /Notification/createNotification.php | `id_match`, `id_person` | Boolean |
> | ![DELETE][DELETE] | /Notification/deleteNotification.php |`id_match`, `id_person`| Boolean |
> | ![GET][GET] | /Notification/getNotification.php | `id_person` | Notifcations |
> | ![PUT][PUT] | /Notification/updateNotification.php | `id_person`,`id_match` | Boolean |
> | ![GET][GET] | /Person/connection.php | `email`, `password` | Boolean |
> | ![POST][POST] | /Person/createPerson.php | `first_name`, `name`, `email`, `password`, `id_photo`, `id_city` | Boolean |
> | ![GET][GET] | /Person/disconnect.php | `id_person` | Boolean |
> | ![GET][GET] | /Person/getPerson.php | `id_match` | Persons |
> | ![PUT][PUT] | /Person/updatePerson.php | `id_person`, `id_photo`, `id_city`, `age`, `id_physical_form`, `application_note`, `password` | Boolean |


[GET]: https://img.shields.io/badge/GET-brightgreen?style=flat
[POST]: https://img.shields.io/badge/POST-orange?style=flat
[PUT]: https://img.shields.io/badge/PUT-blue?style=flat
[DELETE]: https://img.shields.io/badge/DELETE-red?style=flat