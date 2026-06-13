export type DishType = 'PLAT_PRINCIPAL' | 'PETIT_DEJEUNER';

export interface Plat {
  id: string;
  nom: string;
  type: DishType;
  ingredients_saisonniers: string[];
  description: string;
  temps_preparation: number;
  prix_fcfa: number;
}

export interface SaisonIngredient {
  nom: string;
  mois: number[];
}

export const Aliments_Saisonniers: SaisonIngredient[] = [
  { nom: 'safou', mois: [6, 7, 8, 9] },
  { nom: 'mangue', mois: [3, 4, 5] },
  { nom: 'pistache', mois: [8, 9, 10] },
  { nom: 'gombo', mois: [5, 6, 7, 8, 9] },
  { nom: 'eru_feuille', mois: [5, 6, 7, 8, 9, 10] },
  { nom: 'igname', mois: [8, 9, 10, 11, 12] },
  { nom: 'mais', mois: [6, 7, 8, 9, 10] },
  { nom: 'macabo', mois: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { nom: 'plantain', mois: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { nom: 'arachide', mois: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { nom: 'tomate', mois: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { nom: 'oignon', mois: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { nom: 'gingembre', mois: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { nom: 'poisson_fume', mois: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { nom: 'crevettes', mois: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { nom: 'ndole_feuille', mois: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { nom: 'mbongo', mois: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { nom: 'haricot', mois: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { nom: 'manioc', mois: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { nom: 'citron', mois: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
];

export const Catalogue_Plats: Plat[] = [
  // PLAT_PRINCIPAL
  {
    id: 'p1',
    nom: 'Ndolé',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['ndole_feuille', 'arachide', 'crevettes'],
    description: 'Plat national du Cameroun à base de feuilles de ndolé et d\'arachides. Très nutritif, riche en fer et en protéines.',
    temps_preparation: 120,
    prix_fcfa: 3000
  },
  {
    id: 'p2',
    nom: 'Koki',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['haricot'],
    description: 'Gâteau de haricots cuit à la vapeur, originaire de l\'Ouest du Cameroun. Très riche en protéines végétales.',
    temps_preparation: 90,
    prix_fcfa: 1500
  },
  {
    id: 'p3',
    nom: 'Kati Kati',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['poulet', 'tomate'],
    description: 'Poulet sauté traditionnel de la région du Nord-Ouest. Épicé et plein de saveurs.',
    temps_preparation: 45,
    prix_fcfa: 2500
  },
  {
    id: 'p4',
    nom: 'Eru',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['eru_feuille'],
    description: 'Mélange de feuilles d\'eru et de waterleaf, très prisé dans le Sud-Ouest. Riche en fibres.',
    temps_preparation: 60,
    prix_fcfa: 2000
  },
  {
    id: 'p5',
    nom: 'Riz sauce arachide',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['arachide', 'tomate'],
    description: 'Un classique réconfortant. La sauce aux arachides apporte de bonnes graisses et de l\'énergie.',
    temps_preparation: 45,
    prix_fcfa: 1500
  },
  {
    id: 'p6',
    nom: 'Riz sauce tomate',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['tomate', 'oignon'],
    description: 'Plat simple et apprécié de tous. La tomate est une excellente source d\'antioxydants.',
    temps_preparation: 40,
    prix_fcfa: 1200
  },
  {
    id: 'p7',
    nom: 'Risotto',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: [],
    description: 'Plat onctueux d\'inspiration étrangère, adapté avec des produits locaux.',
    temps_preparation: 45,
    prix_fcfa: 2500
  },
  {
    id: 'p8',
    nom: 'Bouillon de porc',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['gingembre', 'oignon'],
    description: 'Soupe claire et épicée, idéale pour se revigorer. Le gingembre aide à la digestion.',
    temps_preparation: 60,
    prix_fcfa: 2000
  },
  {
    id: 'p9',
    nom: 'Bouillon de poisson',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['gingembre', 'tomate'],
    description: 'Bouillon léger au poisson frais, très digeste et riche en oméga-3.',
    temps_preparation: 40,
    prix_fcfa: 2500
  },
  {
    id: 'p10',
    nom: 'Nkui',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: [],
    description: 'Plat traditionnel bamiléké gluant et très épicé, souvent offert aux jeunes mamans pour ses vertus.',
    temps_preparation: 40,
    prix_fcfa: 1500
  },
  {
    id: 'p11',
    nom: 'Mbongo Tchobi',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['mbongo', 'tomate', 'poisson_fume'],
    description: 'Plat emblématique Bassa, sauce noire épicée. Le mbongo est reconnu pour ses propriétés médicinales.',
    temps_preparation: 75,
    prix_fcfa: 2500
  },
  {
    id: 'p12',
    nom: 'Poisson braisé baton',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['manioc', 'oignon'],
    description: 'Le classique des soirées camerounaises. Poisson grillé accompagné de bâton de manioc.',
    temps_preparation: 60,
    prix_fcfa: 3500
  },
  {
    id: 'p13',
    nom: 'Okok salé',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['arachide', 'manioc'],
    description: 'Préparation salée de feuilles d\'okok, très nourrissante et populaire dans le Centre.',
    temps_preparation: 120,
    prix_fcfa: 2000
  },
  {
    id: 'p14',
    nom: 'Okok sucré',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['arachide', 'manioc'],
    description: 'Version légèrement sucrée de l\'okok, un délice énergétique.',
    temps_preparation: 120,
    prix_fcfa: 2000
  },
  {
    id: 'p15',
    nom: 'Poulet DG',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['plantain', 'tomate', 'carotte'],
    description: 'Le plat des "Directeurs Généraux". Un ragoût riche de poulet et de plantains frits.',
    temps_preparation: 90,
    prix_fcfa: 4000
  },
  {
    id: 'p16',
    nom: 'Taro',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: [],
    description: 'Pâte de taro pilé avec sa sauce jaune emblématique de l\'Ouest, plat de célébration.',
    temps_preparation: 150,
    prix_fcfa: 3000
  },
  {
    id: 'p17',
    nom: 'Pilé de pommes',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['haricot'],
    description: 'Mélange de pommes de terre pilées et de haricots. Un plat de consistance par excellence.',
    temps_preparation: 60,
    prix_fcfa: 1500
  },
  {
    id: 'p18',
    nom: 'Pilé de plantains',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['plantain', 'haricot'],
    description: 'Plantains pilés mélangés aux haricots, très nourrissant et énergétique.',
    temps_preparation: 70,
    prix_fcfa: 1500
  },
  {
    id: 'p19',
    nom: 'Couscous sauce jaune',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['mais'],
    description: 'Couscous de maïs servi avec la célèbre sauce jaune à l\'huile de palme et aux épices douces.',
    temps_preparation: 90,
    prix_fcfa: 2500
  },
  {
    id: 'p20',
    nom: 'Ratatouille',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['tomate', 'oignon', 'aubergine'],
    description: 'Mijoté de légumes, léger et plein de vitamines, adapté aux légumes locaux.',
    temps_preparation: 45,
    prix_fcfa: 1500
  },
  {
    id: 'p21',
    nom: 'Haricot sauté',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['haricot', 'oignon'],
    description: 'Haricots mijotés avec des oignons, plat économique et riche en protéines.',
    temps_preparation: 60,
    prix_fcfa: 1000
  },
  {
    id: 'p22',
    nom: 'Tapioca sauté',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['manioc'],
    description: 'Tapioca préparé avec des légumes ou des œufs, rapide et énergétique.',
    temps_preparation: 20,
    prix_fcfa: 800
  },
  {
    id: 'p23',
    nom: 'Spaghettis sauce tomate',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['tomate', 'oignon'],
    description: 'Les pâtes à la sauce tomate locales, un plat familial rapide.',
    temps_preparation: 30,
    prix_fcfa: 1000
  },
  {
    id: 'p24',
    nom: 'Spaghettis sauté',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['oignon', 'carotte'],
    description: 'Spaghettis revenus à la poêle avec des légumes, façon street-food.',
    temps_preparation: 25,
    prix_fcfa: 1000
  },
  {
    id: 'p25',
    nom: 'Ndomba de porc',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['tomate', 'oignon'],
    description: 'Viande de porc cuite à l\'étouffée dans des feuilles de bananier avec des épices.',
    temps_preparation: 90,
    prix_fcfa: 3000
  },
  {
    id: 'p26',
    nom: 'Ekwang',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['macabo', 'poisson_fume'],
    description: 'Macabo râpé enroulé dans des feuilles tendres, mijoté aux crevettes et poisson fumé. Très nutritif.',
    temps_preparation: 180,
    prix_fcfa: 3500
  },
  {
    id: 'p27',
    nom: 'Igname sauté',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['igname', 'oignon'],
    description: 'Igname cuite puis sautée aux épices, une excellente source de glucides complexes.',
    temps_preparation: 40,
    prix_fcfa: 1500
  },
  {
    id: 'p28',
    nom: 'Légumes sautés igname',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['igname', 'tomate'],
    description: 'Mélange de légumes et morceaux d\'igname, pour un repas végétarien équilibré.',
    temps_preparation: 45,
    prix_fcfa: 1800
  },
  {
    id: 'p29',
    nom: 'Macabo Rapé',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['macabo', 'arachide'],
    description: 'Gâteau de macabo préparé dans des feuilles, riche et délicieux.',
    temps_preparation: 120,
    prix_fcfa: 2000
  },
  {
    id: 'p30',
    nom: 'Sanga',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['mais', 'feuilles_ameres'],
    description: 'Mélange de maïs en grain et de feuilles vertes, sans sel ni huile, très diététique.',
    temps_preparation: 60,
    prix_fcfa: 1200
  },
  {
    id: 'p31',
    nom: 'Couscous sauce gombo',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['mais', 'gombo'],
    description: 'Couscous servi avec une sauce gluante au gombo, très appréciée pour sa texture.',
    temps_preparation: 45,
    prix_fcfa: 1500
  },
  {
    id: 'p32',
    nom: 'Sauté d escargots',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['tomate', 'oignon'],
    description: 'Escargots géants sautés aux épices, une grande source de fer et de protéines maigres.',
    temps_preparation: 60,
    prix_fcfa: 3000
  },
  {
    id: 'p33',
    nom: 'Banane malaxée',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['plantain', 'arachide'],
    description: 'Ragoût de bananes non mûres et de pâte d\'arachide, très populaire dans l\'Ouest.',
    temps_preparation: 60,
    prix_fcfa: 1500
  },
  {
    id: 'p34',
    nom: 'Pommes sautées',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['oignon'],
    description: 'Pommes de terre rissolées, simples et efficaces.',
    temps_preparation: 30,
    prix_fcfa: 1200
  },
  {
    id: 'p35',
    nom: 'Choux sauté',
    type: 'PLAT_PRINCIPAL',
    ingredients_saisonniers: ['carotte', 'oignon'],
    description: 'Légumes croquants sautés, idéals en accompagnement ou repas léger.',
    temps_preparation: 25,
    prix_fcfa: 1000
  },

  // PETIT_DEJEUNER
  {
    id: 'pd1',
    nom: 'Pain oeuf simple',
    type: 'PETIT_DEJEUNER',
    ingredients_saisonniers: [],
    description: 'Sandwich classique à l\'œuf, rapide et protéiné pour bien démarrer.',
    temps_preparation: 5,
    prix_fcfa: 300
  },
  {
    id: 'pd2',
    nom: 'Pain omelette',
    type: 'PETIT_DEJEUNER',
    ingredients_saisonniers: ['oignon', 'tomate'],
    description: 'Le petit déjeuner de rue par excellence. Omelette riche garnie dans du pain baguette.',
    temps_preparation: 10,
    prix_fcfa: 500
  },
  {
    id: 'pd3',
    nom: 'Pain chocolat',
    type: 'PETIT_DEJEUNER',
    ingredients_saisonniers: [],
    description: 'Pain avec pâte à tartiner, le favori des écoliers pour un plein d\'énergie rapide.',
    temps_preparation: 2,
    prix_fcfa: 300
  },
  {
    id: 'pd4',
    nom: 'Pain beurre',
    type: 'PETIT_DEJEUNER',
    ingredients_saisonniers: [],
    description: 'Simple et réconfortant avec une tasse de thé.',
    temps_preparation: 2,
    prix_fcfa: 250
  },
  {
    id: 'pd5',
    nom: 'Pain saucisson',
    type: 'PETIT_DEJEUNER',
    ingredients_saisonniers: [],
    description: 'Sandwich consistant pour les matins pressés.',
    temps_preparation: 3,
    prix_fcfa: 500
  },
  {
    id: 'pd6',
    nom: 'Pain lait chaud',
    type: 'PETIT_DEJEUNER',
    ingredients_saisonniers: [],
    description: 'Petit déjeuner doux et réchauffant, très apprécié par temps frais.',
    temps_preparation: 5,
    prix_fcfa: 400
  },
  {
    id: 'pd7',
    nom: 'Pain haricot',
    type: 'PETIT_DEJEUNER',
    ingredients_saisonniers: ['haricot'],
    description: 'Un classique du beignetariat. Très nourrissant et économique.',
    temps_preparation: 15, // Supposant haricots précuits
    prix_fcfa: 400
  },
  {
    id: 'pd8',
    nom: 'Pain bouillie',
    type: 'PETIT_DEJEUNER',
    ingredients_saisonniers: ['mais'],
    description: 'La fameuse bouillie de maïs avec du pain ou des beignets. Traditionnel et rassasiant.',
    temps_preparation: 20,
    prix_fcfa: 300
  },
  {
    id: 'pd9',
    nom: 'BHB',
    type: 'PETIT_DEJEUNER',
    ingredients_saisonniers: ['haricot'],
    description: 'Beignets, Haricots, Bouillie. Le petit déjeuner national ultime, source d\'énergie intense.',
    temps_preparation: 30,
    prix_fcfa: 500
  },
  {
    id: 'pd10',
    nom: 'Purée d avocat',
    type: 'PETIT_DEJEUNER',
    ingredients_saisonniers: [],
    description: 'Avocat écrasé tartiné sur du pain, plein de bons lipides.',
    temps_preparation: 5,
    prix_fcfa: 400
  },
  {
    id: 'pd11',
    nom: 'Salade de fruits',
    type: 'PETIT_DEJEUNER',
    ingredients_saisonniers: ['mangue', 'safou'], // Exemple
    description: 'Frais et vitaminé, parfait pour un réveil léger et diététique.',
    temps_preparation: 10,
    prix_fcfa: 500
  },
  {
    id: 'pd12',
    nom: 'Gâteau madeleine yaourt',
    type: 'PETIT_DEJEUNER',
    ingredients_saisonniers: [],
    description: 'Douceur locale servie avec un yaourt brassé.',
    temps_preparation: 5,
    prix_fcfa: 600
  },
  {
    id: 'pd13',
    nom: 'Plantain frit oeuf frit',
    type: 'PETIT_DEJEUNER',
    ingredients_saisonniers: ['plantain'],
    description: 'Des rondelles de plantains mûrs frits (alloco) accompagnés d\'un œuf sur le plat.',
    temps_preparation: 15,
    prix_fcfa: 600
  },
  {
    id: 'pd14',
    nom: 'Oeuf frit baton de manioc',
    type: 'PETIT_DEJEUNER',
    ingredients_saisonniers: ['manioc'],
    description: 'Un petit déjeuner copieux et résolument local.',
    temps_preparation: 10,
    prix_fcfa: 500
  }
];
