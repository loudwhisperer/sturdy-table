const { Event } = require('../models');

const eventEl = [
    {
        name: "Deep, Dark, and Dangerous",
        date: "2023-02-16",
        time_start: "14:00:00",
        est_length: 150,
        is_public: true,
        is_virtual: false,
        max_users: 8,
        location: "123 Main St. Fort Collins, CO 80525",
        category: "Campaign/Legacy",
        game_name: "Gloomhaven",
        notes: "Hosting up to two games depending on attendance. Typical length is 2 hours. BYOB!"
    },
    {
        name: "Wednesday Night Draft",
        date: "2023-02-08",
        time_start: "19:30:00",
        est_length: 240,
        is_public: true,
        is_virtual: false,
        max_users: 20,
        location: "1119 W Drake Rd C-30, Fort Collins, CO 80526",
        category: "Deck Construction",
        game_name: "Magic: The Gathering",
        notes: "Entrance cost is $10 at the door. All ages welcome."
    }, 
    {
        name: "Saturday Smash Suite",
        date: "2023-04-01",
        time_start: "12:00:00",
        est_length: 270,
        is_public: true,
        is_virtual: true,
        max_users: 32,
        location: "smash.gg",
        category: "Video Game",
        game_name: "Super Smash Bros. Ultimate",
        notes: "Double Elimination Tournament. 3 Stocks, 8 Minutes, No Hazards."
    },
    {
        name: "Does Anyone Have Any Sheep?",
        date: "2023-02-08",
        time_start: "18:30:00",
        est_length: 150,
        is_public: false,
        is_virtual: false,
        max_users: 4,
        location: "4600 Jason St, Denver, CO 80211",
        category: "Eurogame",
        game_name: "Settlers of Catan",
        notes: "Snacks and beer will be provided, just bring smiles!"
    },
    {
        name: "Venture Capitalists",
        date: "2023-02-13",
        time_start: "10:00:00",
        est_length: 180,
        is_public: false,
        is_virtual: false,
        max_users: 8,
        location: "1418 W Howard St, Chicago, IL 60626",
        category: "Roll-and-Move",
        game_name: "Monopoly",
        notes: "Get ready to wreck our friendship in this extremely competetive game of Monopoly"
    },
    {
        name: "Old School Gamerz Only",
        date: "2023-02-08",
        time_start: "22:00:00",
        est_length: 120,
        is_public: true,
        is_virtual: false,
        max_users: 6,
        location: "",
        category: "Wargame",
        game_name: "Warhammer 40,000",
        notes: "Playing old school 40k. Beverages supplied."
    },
    {
        name: "Cyber DnD",
        date: "2023-05-01",
        time_start: "12:00:00",
        est_length: 240,
        is_public: true,
        is_virtual: true,
        max_users: 6,
        location: "roll20.net",
        category: "Campaign/Legacy",
        game_name: "Dungeons and Dragons 5E",
        notes: "Welcoming new players."
    },
    {
        name: "Spice Traders Anonymous",
        date: "2023-04-20",
        time_start: "15:00:00",
        est_length: 180,
        is_public: false,
        is_virtual: false,
        max_users: 6,
        location: "1119 W Drake Rd C-30, Fort Collins, CO 80526",
        category: "Area Control",
        game_name: "Dune",
        notes: "Casual game with some friends."
    },
    {
        name: "Who Done It?",
        date: "2023-03-15",
        time_start: "22:00:00",
        est_length: 120,
        is_public: false,
        is_virtual: false,
        max_users: 6,
        location: "27 Columbia Way, Las Vegas NV, 88901",
        category: "Roll-and-Move",
        game_name: "Clue",
        notes: "Couple of late night games to get ready for the murder mystery movie. Popcorn supplied!"
    },
    {
        name: "Game with Grandpa",
        date: "2023-04-06",
        time_start: "14:00:00",
        est_length: 15,
        is_public: false,
        is_virtual: false,
        max_users: 2,
        location: "1600 Pennsylvania Avenue NW, Washington, DC 20500",
        category: "Social Deduction",
        game_name: "Coup",
        notes: "Grandpa, can you see this event yet?"
    },
    {
        name: "Let's Get Off Track",
        date: "2023-02-21",
        time_start: "13:00:00",
        est_length: 60,
        is_public: false,
        is_virtual: true,
        max_users: 4,
        location: "",
        category: "Roll-and-Write",
        game_name: "Next Station: London",
        notes: "Trying something new. You know, trains and stuff?"
    },
    {
        name: "Psychological Warfare",
        date: "2023-04-06",
        time_start: "14:30:00",
        est_length: 165,
        is_public: false,
        is_virtual: true,
        max_users: 2,
        location: "chess.com",
        category: "Abstract",
        game_name: "Chess",
        notes: "Magnus Carlson accepted my challenge, he doesn't stand a chance!"
    },
    {
        name: "Game Night",
        date: "2023-03-21",
        time_start: "19:00:00",
        est_length: 120,
        is_public: false,
        is_virtual: false,
        max_users: 5,
        location: "157 Wooster St, New Haven, CT 06511",
        category: "Abstract",
        game_name: "Machiavelli",
        notes: "Weekly game night, learning a new card game this week. Always up to switching, also."
    },
    {
        name: "Duelists!?",
        date: "2023-04-21",
        time_start: "12:00:00",
        est_length: 60,
        is_public: true,
        is_virtual: true,
        max_users: 2,
        location: "en.boardgamearena.com",
        category: "Abstract",
        game_name: "7 Wonders Duel",
        notes: "Who will challenge me?! Best of 3."
    },
    {
        name: "Let's Go Exploring!",
        date: "2023-04-07",
        time_start: "15:00:00",
        est_length: 90,
        is_public: false,
        is_virtual: true,
        max_users: 5,
        location: "roll20.com",
        category: "Campaign/Legacy",
        game_name: "Betrayal Legacy",
        notes: "I hear this one is spooooooky"
    },
    {
        name: "Space Combat Combantant Needed!",
        date: "2023-03-27",
        time_start: "11:00:00",
        est_length: 60,
        is_public: true,
        is_virtual: true,
        max_users: 2,
        location: "en.boardgamearena.com",
        category: "Wargame",
        game_name: "Talon",
        notes: "Looking for someone to play this new game with me that I haven't tried."
    },
    {
        name: "Crawling the Dungeons, Friendship Style",
        date: "2023-04-06",
        time_start: "19:00:00",
        est_length: 40,
        is_public: false,
        is_virtual: false,
        max_users: 5,
        location: "201 E Randolph St, Chicago, IL 60602",
        category: "Dungeon Crawler",
        game_name: "Legends of Hellas",
        notes: "Just looking to play some casual games with the friends. Bring what you want!"
    },
    {
        name: "",
        date: "2023-04-12",
        time_start: "11:30:00",
        est_length: 60,
        is_public: true,
        is_virtual: true,
        max_users: 4,
        location: "en.boardgamearena.com",
        category: "Engine Builder",
        game_name: "Race for the Galaxy",
        notes: "Trying to teach new players how to play this awesome game!"
    },
    {
        name: "Who will be the Super Star?!",
        date: "2023-02-21",
        time_start: "10:45:00",
        est_length: 120,
        is_public: true,
        is_virtual: false,
        max_users: 12,
        location: "2721 S College Ave, Fort Collins, CO 80525",
        category: "Video Game",
        game_name: "Mario Party 7",
        notes: "We have 3 set ups that can allow up to 4 players on each. Controller required to play. Bring your A Game."
    },
    {
        name: "Journey to the West",
        date: "2023-04-12",
        time_start: "16:00:00",
        est_length: 60,
        is_public: true,
        is_virtual: true,
        max_users: 4,
        location: "en.boardgamearena.com",
        category: "Worker Placement",
        game_name: "Ultimate Railroads",
        notes: "All Aboard! Toot Toot!"
    }
]

const eventData = () => Event.bulkCreate(eventData);

module.exports = eventData;