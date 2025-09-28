import type { EraKey } from "./eras"

export type Q = {
  id: string
  era: EraKey
  text: string
  options: string[]
  correctIndex: number
  funFact?: string
}

// For brevity, 5 per era. You can expand to 15–20 later.
export const QUESTIONS: Q[] = [
  // Prehistoric
  {
    id: "pre-1",
    era: "prehistoric",
    text: "Which period is known for the dominance of dinosaurs?",
    options: ["Triassic", "Jurassic", "Cambrian", "Permian"],
    correctIndex: 1,
    funFact: "The Jurassic period spanned roughly 201–145 million years ago.",
  },
  {
    id: "pre-2",
    era: "prehistoric",
    text: "What is the name of early human ancestors who used tools?",
    options: ["Homo sapiens", "Homo habilis", "Neanderthals", "Australopithecus"],
    correctIndex: 1,
    funFact: "Homo habilis is one of the earliest toolmakers, about 2.4–1.4 million years ago.",
  },
  {
    id: "pre-3",
    era: "prehistoric",
    text: "Fossilized tree resin is known as:",
    options: ["Amber", "Opal", "Quartz", "Basalt"],
    correctIndex: 0,
  },
  {
    id: "pre-4",
    era: "prehistoric",
    text: "Which giant mammal roamed the Ice Age?",
    options: ["Saber-toothed salmon", "Giant sloth", "Woolly mammoth", "Moose"],
    correctIndex: 2,
  },
  {
    id: "pre-5",
    era: "prehistoric",
    text: "The KT event is associated with:",
    options: ["Origin of mammals", "First plants", "Dinosaur extinction", "First tools"],
    correctIndex: 2,
  },

  // Ancient Egypt
  {
    id: "egy-1",
    era: "egypt",
    text: "Which pharaoh built the Great Pyramid?",
    options: ["Cleopatra", "Tutankhamun", "Khufu", "Ramesses II"],
    correctIndex: 2,
    funFact: "The Great Pyramid of Giza was built for Pharaoh Khufu around 2560 BCE.",
  },
  {
    id: "egy-2",
    era: "egypt",
    text: "What river was central to Ancient Egyptian life?",
    options: ["Tigris", "Nile", "Euphrates", "Indus"],
    correctIndex: 1,
  },
  {
    id: "egy-3",
    era: "egypt",
    text: "Egyptian writing system is called:",
    options: ["Cuneiform", "Hieroglyphs", "Runes", "Alphabet"],
    correctIndex: 1,
  },
  {
    id: "egy-4",
    era: "egypt",
    text: "What was used to preserve bodies?",
    options: ["Mummification", "Petrification", "Fossilization", "Ossification"],
    correctIndex: 0,
  },
  {
    id: "egy-5",
    era: "egypt",
    text: "The Sphinx has the head of a human and body of a:",
    options: ["Lion", "Bull", "Hawk", "Crocodile"],
    correctIndex: 0,
  },

  // Medieval
  {
    id: "med-1",
    era: "medieval",
    text: "What system structured land and loyalty in medieval Europe?",
    options: ["Feudalism", "Capitalism", "Democracy", "Guildism"],
    correctIndex: 0,
  },
  {
    id: "med-2",
    era: "medieval",
    text: "Which was a fortified residence of nobility?",
    options: ["Manor", "Castle", "Abbey", "Forge"],
    correctIndex: 1,
  },
  {
    id: "med-3",
    era: "medieval",
    text: "The Black Death was caused by:",
    options: ["Bacteria", "Virus", "Fungi", "Curse"],
    correctIndex: 0,
  },
  {
    id: "med-4",
    era: "medieval",
    text: "Code of conduct for knights:",
    options: ["Stoicism", "Chivalry", "Mercantilism", "Asceticism"],
    correctIndex: 1,
  },
  {
    id: "med-5",
    era: "medieval",
    text: "Gothic cathedrals are known for:",
    options: ["Flying buttresses", "Flat roofs", "Low windows", "No arches"],
    correctIndex: 0,
  },

  // Renaissance
  {
    id: "ren-1",
    era: "renaissance",
    text: "Who painted the Mona Lisa?",
    options: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Donatello"],
    correctIndex: 2,
  },
  {
    id: "ren-2",
    era: "renaissance",
    text: "Renaissance means:",
    options: ["Rebirth", "Revolt", "Reform", "Relief"],
    correctIndex: 0,
  },
  {
    id: "ren-3",
    era: "renaissance",
    text: "A famous Renaissance city-state in Italy:",
    options: ["Florence", "Berlin", "Madrid", "Athens"],
    correctIndex: 0,
  },
  {
    id: "ren-4",
    era: "renaissance",
    text: "Movable-type printing was popularized by:",
    options: ["Newton", "Gutenberg", "Kepler", "Galileo"],
    correctIndex: 1,
  },
  {
    id: "ren-5",
    era: "renaissance",
    text: "Humanism emphasized:",
    options: ["Divine rule", "Human potential", "Absolute monarchy", "Isolation"],
    correctIndex: 1,
  },

  // Wild West
  {
    id: "ww-1",
    era: "wild-west",
    text: "Which transport connected the West during the 19th century?",
    options: ["Canals", "Railroads", "Airplanes", "Subways"],
    correctIndex: 1,
  },
  {
    id: "ww-2",
    era: "wild-west",
    text: "Law officers often wore a:",
    options: ["Crown", "Badge", "Laurel", "Medal"],
    correctIndex: 1,
  },
  {
    id: "ww-3",
    era: "wild-west",
    text: "Typical frontier building:",
    options: ["Pagoda", "Saloon", "Castle", "Pyramid"],
    correctIndex: 1,
  },
  {
    id: "ww-4",
    era: "wild-west",
    text: "Common landscape:",
    options: ["Desert plains", "Rainforest", "Arctic tundra", "Mangroves"],
    correctIndex: 0,
  },
  {
    id: "ww-5",
    era: "wild-west",
    text: "Tumbleweeds are often seen in:",
    options: ["Eastern forests", "Western frontiers", "Tropical islands", "Mountaintops"],
    correctIndex: 1,
  },

  // Victorian
  {
    id: "vic-1",
    era: "victorian",
    text: "Victorian era overlaps with the reign of:",
    options: ["Queen Elizabeth I", "Queen Victoria", "King George V", "Queen Anne"],
    correctIndex: 1,
  },
  {
    id: "vic-2",
    era: "victorian",
    text: "A hallmark of Victorian tech:",
    options: ["Steam engines", "Jet engines", "Transistors", "Lasers"],
    correctIndex: 0,
  },
  {
    id: "vic-3",
    era: "victorian",
    text: "Gas lamps lit many streets before:",
    options: ["LEDs", "Candles", "Electric lights", "Lasers"],
    correctIndex: 2,
  },
  {
    id: "vic-4",
    era: "victorian",
    text: "Popular literature included works by:",
    options: ["Charles Dickens", "Ernest Hemingway", "Jane Austen", "George Orwell"],
    correctIndex: 0,
  },
  {
    id: "vic-5",
    era: "victorian",
    text: "A common Victorian fashion accessory:",
    options: ["Pocket watch", "Smartwatch", "Baseball cap", "Sneakers"],
    correctIndex: 0,
  },

  // Space Age
  {
    id: "spa-1",
    era: "space-age",
    text: "Who was the first human in space?",
    options: ["Neil Armstrong", "Yuri Gagarin", "John Glenn", "Buzz Aldrin"],
    correctIndex: 1,
  },
  {
    id: "spa-2",
    era: "space-age",
    text: "First human on the Moon:",
    options: ["Buzz Aldrin", "Neil Armstrong", "Alan Shepard", "Michael Collins"],
    correctIndex: 1,
  },
  {
    id: "spa-3",
    era: "space-age",
    text: "A reusable spacecraft by NASA:",
    options: ["Apollo", "Gemini", "Space Shuttle", "Soyuz"],
    correctIndex: 2,
  },
  {
    id: "spa-4",
    era: "space-age",
    text: "The ISS orbits the Earth about every:",
    options: ["90 minutes", "24 hours", "7 days", "12 hours"],
    correctIndex: 0,
  },
  {
    id: "spa-5",
    era: "space-age",
    text: "A space telescope launched in 1990:",
    options: ["Hubble", "Webb", "Chandra", "Spitzer"],
    correctIndex: 0,
  },
]

export function getQuestionsForEra(era: EraKey) {
  return QUESTIONS.filter((q) => q.era === era)
}
