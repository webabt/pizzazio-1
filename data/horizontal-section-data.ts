// Daten für die Boxen im horizontalen Abschnitt
export const boxes = [
  {
    title: "Peperoni N.1",
    ingredients:
      "Mozzarella, würzige Peperoni-Salami und unsere hausgemachte Tomatensauce. Klassisch, herzhaft, immer ein Favorit.",
    image: "/images/bild1.png",
  },
  {
    title: "Margarita N.2",
    ingredients:
      "San Marzano Tomaten, zart schmelzender Fior di Latte, Basilikum, natives Olivenöl, Teig mit langer Ruhezeit.",
    image: "/images/bild2.png",
  },
  {
    title: "Aglio e Olio N.3",
    ingredients:
      "Spaghetti mit goldbraunem Knoblauch, Chili, Olivenöl und einem Hauch Zitrone. Leicht, würzig und absolut italienisch.",
    image: "/images/bild3.png",
  },
  {
    title: "Panna e Funghi N.4",
    ingredients:
      "Tagliatelle in cremiger Sauce mit frischen Pilzen, Knoblauch und Thymian. Erdiger Geschmack trifft auf feine Eleganz.",
    image: "/images/bild4.png",
  },
]

// Daten für die Info-Elemente zwischen den Boxen
export const infoElements = [
  {
    title: "#2023",
    text: "In dem Jahr, in dem der erste Teig ausgerollt und die erste Margherita mit Liebe belegt wurde. Aus einer Idee wurde ein Treffpunkt für Pizza-Fans und Nachbarn. Unsere Öfen liefen heiß – und euer Hunger auf mehr war größer als gedacht.",
  },
  {
    title: "#2024",
    text: "Mit neuen Ideen im Ofen haben wir unsere Karte um besondere Pizzen wie die Trüffel-Salami ergänzt. Aus Klassikern wurden Favoriten, aus Experimenten echte Highlights. Jede Pizza war ein kleines Statement – knusprig, kreativ und genau nach eurem Geschmack.",
  },
  {
    title: "#2025",
    text: "2025 dreht sich nicht nur um Pizza, sondern um all die besonderen Momente, die ihr mit uns teilt. Zwischen Familienfeiern, Lieblingsplätzen und extra Käse entstehen Erinnerungen, die bleiben. Jede Bestellung erzählt ihre eigene kleine Geschichte – und wir lieben jede einzelne davon.",
  },
]

// Individuelle Konfiguration für jeden Sticker
export const stickerConfigurations = [
  // Sticker zwischen den Boxen
  {
    main: {
      src: "/images/käse.svg",
      alt: "Käse",
      size: 170,
      position: { top: "-17%", left: "-80%" }, // Oben links
      parallaxSpeed: 0.2,
      rotationMultiplier: 0.3,
    },
    additional: {
      src: "/images/Salzstreuer.svg",
      alt: "Salzstreuer",
      size: 90,
      position: { bottom: "-25%", right: "-15%" }, // Unten rechts
      parallaxSpeed: -0.18,
      rotationMultiplier: 0.4,
    },
  },
  // Zweite Sticker-Gruppe - Beispiel mit verschiedenen Positionen
  {
    main: {
      src: "/images/sauce.svg",
      alt: "Sauce",
      size: 100,
      position: { top: "-35%", left: "-80%" }, // Unten links
      parallaxSpeed: 0.18,
      rotationMultiplier: 0.3,
    },
    additional: {
      src: "/images/chili.svg",
      alt: "Chili",
      size: 180,
      position: { bottom: "-15%", right: "-70%" }, // Oben rechts
      parallaxSpeed: -0.17,
      rotationMultiplier: -1,
    },
  },
  // Dritte Sticker-Gruppe - Beispiel mit allen vier Positionen möglich
  {
    main: {
      src: "/images/olivenöl.svg",
      alt: "Olivenöl",
      size: 125,
      position: { top: "-21%", right: "-240%" }, // Oben rechts
      parallaxSpeed: -0.2,
      rotationMultiplier: 0.3,
    },
    additional: {
      src: "/images/drink.svg",
      alt: "Drink",
      size: 140,
      position: { bottom: "-40%", right: "-65%" }, // Unten links
      parallaxSpeed: -0.15,
      rotationMultiplier: 1,
    },
  },
]
