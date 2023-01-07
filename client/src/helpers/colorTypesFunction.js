export const colorTypes = (e) =>{
    let color = null;
    switch (e) {
      case "fire":
        color = "#f94144";
        break;
      case "normal":
        color = "#adb5bd";
        break;
      case "flying":
        color = "";
        break;
      case "fighting":
        color = "#bb3e03";
        break;
      case "poison":
        color = "#9f86c0";
        break;
      case "bug":
        color = "#718355";
        break;
      case "ground":
        color = "#6f5e53";
        break;
      case "rock":
        color = "#5c5552";
        break;
      case "ghost":
        color = "#7B62A3";
        break;
      case "steel":
        color = "#9EB6B7";
        break;
      case "water":
        color = "#0582ca";
        break;
      case "grass":
        color = "#4DAD5B";
        break;
      case "electric":
        color = "#EED535";
        break;
      case "psychic":
        color = "#ffb703";
        break;
      case "ice":
        color = "#00a6fb";
        break;
      case "dragon":
        color = "#edae49";
        break;
      case "unknown":
        color = "#16262e";
        break;
      case "shadow":
        color = "#6c757d";
        break;
      case "dark":
        color = "#707070";
        break;
      case "fairy":
        color = "#FDB9E9";
        break;
      default:
        color = "black";
    }
    return color
};