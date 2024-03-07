import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer as React.CSSProperties}>
      <p style={styles.text}>
        Feito por{" "}
        <a
          href="https://github.com/RenanMaestrya"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          Renan
        </a>
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "20px",
    textAlign: "center",
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "100%",
  },
  text: {
    margin: "0",
  },
  link: {
    color: "yellow",
    textDecoration: "none",
  },
};

export default Footer;
