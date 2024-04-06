const TextDesigns = {
  simple: {
    simple: {
      color: "white",
      fontSize: "medium",
      padding: "5px",
      borderColor: "#2f2222",
      borderWidth: "0px",
      borderStyle: "solid",
      borderRadius: "5px",
      fontFamily: "'Alata'",
      textAlign: "center",
    },
    simple_dar: {
      color: "#ff7575",
      fontSize: "large",
      padding: "5px",
      borderColor: "#2f2222",
      borderWidth: "0px",
      borderStyle: "solid",
      borderRadius: "5px",
      fontFamily: "monospace",
      textAlign: "left",
    },

    enlighten: {
      color: "wheat",
      fontSize: "large",
      padding: "5px",
      borderColor: "#2da837",
      borderWidth: "3px",
      borderStyle: "solid",
      borderRadius: "20px",
      fontFamily: "monospace",
      textAlign: "center",
      background: "orange",
    },
    cornflower: {
      color: "cornflowerblue",
      fontSize: "large",
      padding: "5px",
      borderColor: "#2da837",
      borderWidth: "0px",
      borderStyle: "solid",
      borderRadius: "20px",
      fontFamily: "'Roboto mono'",
      textAlign: "center",
      fontWeight: "500",
      background: "inherit",
    },
    cornflower_border: {
      color: "#3f82fb",
      fontSize: "large",
      padding: "5px",
      borderColor: "#6847ad",
      borderWidth: "2px",
      borderStyle: "dashed",
      borderRadius: "7px",
      fontFamily: "'Roboto mono'",
      textAlign: "center",
      fontWeight: "500",
      background: "inherit",
    },

    saturated: {
      color: "rgb(40 45 59)",
      fontSize: "large",
      padding: "5px",
      borderColor: "#2d0404c4",
      borderWidth: "2px",
      borderStyle: "ridge",
      borderRadius: "7px",
      fontFamily: "'Roboto mono'",
      textAlign: "center",
      fontWeight: "500",
      background: "#f7f4f9",
    },
  },
};

const ImageDesigns = {
  simple: {
    circle: {
      aspectRatio: "1 / 1",
      padding: "5px",
      borderColor: "#bc7575",
      borderWidth: "2px",
      borderStyle: "solid",
      borderRadius: "50%",
      boxSizing: "border-box",
    },
    circle2: {
      aspectRatio: "1 / 1",
      padding: "0px",
      borderColor: "#e13d3d",
      borderWidth: "5px",
      borderStyle: "solid",
      borderRadius: "50%",
      boxSizing: "border-box",
    },
    square: {
      width: "100%",
      aspectRatio: "1 / 1",
      padding: "0px",
      borderColor: "#e13d3d",
      borderWidth: "0px",
      borderStyle: "solid",
      borderRadius: "10px",
      boxSizing: "border-box",
    },
  },
};

const ProgressDesigns = {
  simple: {
    simple: {},
  },

  simple_field: {
    simple_field: {
      background: "#513e3e",
      padding: "5px",
      borderRadius: "5px",
    },
  },

  text: {
    text: {
      background: "#27286f",
      padding: "2px",
      borderRadius: "5px",
      fontFamily: "'Alata'",
    },
  },
};

const UrlDesigns = {
  simple: {
    simple:{

    }
  },
};

const NumberDesigns = {
  simple:{
    simple:{
      background:"blue",
    }
  }
};

export const SampleDesign = {
  text: TextDesigns,
  img_link: ImageDesigns,
  number: NumberDesigns,
  url: UrlDesigns,
  progress: ProgressDesigns,
};

export const defaultStyle = {
  text: {
    color: "white",
    fontSize: "medium",
    padding: "3px",
    borderColor: "brown",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "5px",
    fontFamily: "Roboto mono",
    textAlign: "center",
    background: "transparent",
    fontWeight: "500",
  },
  img_link: {
    aspectRatio: "1",
    padding: "3px",
    borderColor: "brown",
    borderWidth: "1px",
    borderStyle: "solid",
    padding: "5px",
    borderRadius: "5px",
  },

  progress: {
    color: "white",
    fontSize: "medium",
    padding: "3px",
    borderColor: "brown",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "5px",
    fontFamily: "Roboto mono",
    textAlign: "center",
    background: "transparent",
    fontWeight: "500",
  },
  url: {
    color: "white",
    fontSize: "medium",
    padding: "3px",
    borderColor: "brown",
    borderWidth: "0px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "5px",
    fontFamily: "Roboto mono",
    textAlign: "center",
    background: "transparent",
    fontWeight: "500",
  },
  number:{
    color: "white",
    fontSize: "medium",
    padding: "3px",
    borderColor: "brown",
    borderWidth: "0px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "5px",
    fontFamily: "Roboto mono",
    textAlign: "center",
    background: "transparent",
    fontWeight: "500",
  }
};
