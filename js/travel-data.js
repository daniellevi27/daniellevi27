/* TRAVEL DATA 
  
  How to find coordinates:
  1. The map is 0% to 100% width (x) and height (y).
  2. x: 0 is left, 100 is right.
  3. y: 0 is top, 100 is bottom.
  4. Trial and error is the best way. Tweak the numbers, save, refresh.
*/

const travelData = [
    {
        id: "greece",
        title: "Thessaloniki, Greece",
        // Approximate location for Thessaloniki (You may need to tweak these!)
        x: 54.5,  // Left %
        y: 28,    // Top %
        image: "greece.jpg",
        desc: "I stayed in Thessaloniki while on the penultimate leg of my solo Balkan loop! I stayed for two nights and three days. While in Thessaloniki, I explored the coast, the historic upper neighborhood, the castle walls, and met some very interesting people. A hostel stayer I met told me he was biking from Germany to Thailand, and was currently moving through Greece. On the night of February 13, the locals celebrated Carnival and I was able to join in with their traditions!"
    },
    // Add your next trip here like this:
    // { id: "italy", title: "Rome", x: 50, y: 30, ... }
];
