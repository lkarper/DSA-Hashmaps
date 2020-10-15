const HashMap = require('./hashmap');

function main() {
    const lotr = new HashMap();
    lotr.MAX_LOAD_RATIO = 0.5;
    lotr.SIZE_RATIO = 3;

    const data = [
        { "Hobbit": "Bilbo" }, 
        { "Hobbit": "Frodo" }, // Duplicate key replaces old value
        { "Wizard": "Gandalf" }, 
        { "Human": "Aragorn" }, 
        { "Elf": "Legolas" }, 
        { "Maiar": "The Necromancer" },
        { "Maiar": "Sauron" }, // Duplicate key replaces old value
        { "RingBearer": "Gollum" }, 
        { "LadyOfLight": "Galadriel" }, 
        { "HalfElven": "Arwen" },
        { "Ent": "Treebeard" },
    ];
    data.forEach(obj => {
        for (const [key, value] of Object.entries(obj)) {
            lotr.set(key, value);
        }
    });
    console.log(lotr._hashTable);
}

function removeDuplicateLetters(string) {
    const chars = new HashMap();
    chars.MAX_LOAD_RATIO = 0.5;
    chars.SIZE_RATIO = 3;
    let i = 0;
    for (let char of string) {
        if (chars.length === 0) {
            chars.set(i, char);
            i++;
        } else {
            if (chars.searchForValue(char) === false) {
                chars.set(i, char);
                i++;
            }
        }
    }

    let newString = '';

    for (let j = 0; j < i; j++) {
        newString += chars.get(j);
    }
    console.log(newString);
}

function makePerms(str) {
    if (str.length < 2) {
        return str;
    }

    let perms = [];
    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        let remainingChars = str.slice(0, i) + str.slice(i +1, str.length);
    
        for (let permutation of makePerms(remainingChars)) {
            perms.push(char + permutation)
        }
    }
    return perms;
}

function anyPermutationAPalindrome(string) {
    const permsMap = new HashMap();
    permsMap.MAX_LOAD_RATIO = 0.5;
    permsMap.SIZE_RATIO = 3;
    
    const perms = makePerms(string);
    perms.forEach(perm => {
        permsMap.set(perm, perm);
    });

    if (permsMap.length < perms.length) {
        return true;
    }
    return false;
}

function anagramGrouping(wordsArray) {
    const groups = [];
    const anagramsObject = {};

    for (let word of wordsArray) {
        const perms = makePerms(word);
        anagramsObject[word] = perms;
    }
    
    while (wordsArray.length > 0) {
        const tempGroup = [];

        tempGroup.push(wordsArray[0]);

        for (let i = 1; i < wordsArray.length; i++) {
            const word = wordsArray[i];
            const original = tempGroup[0];
            const checking = anagramsObject[word]
            if (checking.includes(original)) {
                tempGroup.push(word);
            }
        }
        wordsArray = wordsArray.filter(word => !tempGroup.includes(word));
        groups.push(tempGroup);
    }

    return groups;
}

console.log(anagramGrouping(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']))

// main();

// removeDuplicateLetters('google all that you think can think of')
