import { Home, HelpCircle, Calendar } from "lucide-react"

// Navbar items
export const navbarItems = [
  {
    title: "Book lokaler",
    href: "/",
    icon: Home,
  },
  {
    title: "Mine bookinger",
    href: "/bookinger",
    icon: Calendar,
  },
  {
    title: "Hjælp",
    href: "/hjaelp",
    icon: HelpCircle,
  },
]


// JSX included here
export const bookingInstructions = [
   {
     step: 1,
     title: 'Åbn "Book lokaler"',
     description: 'I menuen til venstre klikker du på "Book lokaler", hvor du kommer til oversigten med filtreringsmuligheder og lokaler.'
   },
   {
     step: 2,
     title: "Vælg dag og dato",
     description: "Brug dag- og datofeltet til at vælge præcis hvilken dag du ønsker at booke. Når du klikker på datoen, åbner en kalender, hvor du kan vælge dato direkte."
   },
   {
     step: 3,
     title: "Vælg tidsrum",
     description: "Vælg start- og sluttidspunkt for din booking. Systemet opdaterer derefter automatisk, hvilke lokaler der er ledige i det tidsrum."
   },
   {
     step: 4,
     title: "Se listen over lokaler",
     description: (
       <ul className="list-disc pl-5">
         <li>Lokalenummer</li>
         <li>Kapacitet</li>
         <li>Status (Ledig eller Optaget)</li>
         <li>En "Book"-knap, hvis lokalet er ledigt</li>
       </ul>
     )
   },
   {
     step: 5,
     title: "Book et ledigt lokale",
     description: 'Når du har fundet et lokale med status "Ledig", klikker du på "Book". Du får nu vist en lille bekræftelse, hvor dato, tid og lokale står tydeligt.'
   },
   {
     step: 6,
     title: "Bekræft din booking",
     description: 'Klik på "Bekræft booking" for endeligt at reservere lokalet. Din booking bliver nu gemt i systemet.'
   },
   {
     step: 7,
     title: 'Gå til "Mine bookinger"',
     description: 'I venstre menu kan du klikke på "Mine bookinger" for at se alle dine aktive reservationer samlet ét sted. Her står både lokale, tidspunkt og status.'
   },
   {
     step: 8,
     title: "Aflys en booking (valgfrit)",
     description: 'Hvis du vil annullere en af dine bookinger, klikker du på "Annuller". Der kommer nu et popup-vindue, der spørger "Vil du annullere din booking?". Klik "Ja, annuller" for at gennemføre og få besked om, at bookingen er slettet.'
   }
 ];


 // start Timeslots for the filter selections
  // Cannot end at 16:00
 export const StartTimeSlots = [
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
]

 // End Timeslots for the filter selections
 // Cannot end at 8:00, but can end at 16:00
 export const EndTimeSlots = [
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
]

