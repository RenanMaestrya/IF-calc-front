interface HeaderProps {
  isStudentList: boolean;
  onToggle: () => void;
}

const Header = ({ isStudentList, onToggle }: HeaderProps) => {
  const styles = {
    header: {
      backgroundColor: "#333",
      color: "#fff",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    button: {
      backgroundColor: "#fff",
      color: "#333",
      padding: "8px 16px",
      borderRadius: "4px",
      cursor: "pointer",
      border: "none",
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.title}>Grades Calculator</div>
      <button style={styles.button} onClick={onToggle}>
        {isStudentList ? `Students List` : `Back`}
      </button>
    </header>
  );
};

export default Header;
