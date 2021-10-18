export function convertGroupToNumber(group) {
    switch (group) {
        case "G1":
            return 1;
        case "G2":
            return 2;
        case "G3":
            return 3;
        case "G4":
            return 4;
        case "G5":
            return 5;
        default:
            return 0;
    }
}