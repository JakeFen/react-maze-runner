import "./nav.scss";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export function NavBarComponent() {
  const [algoMenu, setAlgoMenu] = React.useState(null);
  const openAlgoMenu = Boolean(algoMenu);

  const [patternMenu, setPatternMenu] = React.useState(null);
  const openPatternMenu = Boolean(patternMenu);

  const algoMenuClick = (event) => {
    setAlgoMenu(event.currentTarget);
  };
  const algoMenuClose = () => {
    setAlgoMenu(null);
  };

  const PatternMenuClick = (event) => {
    setPatternMenu(event.currentTarget);
  };
  const PatternMenuClose = () => {
    setPatternMenu(null);
  };

  function runDijkstra() {
    console.log("Dijkstra");
  }

  return (
    <nav className="navbar">
      <li className="button-wrapper">
        <Button
          sx={{
            color: "#fff",
            "text-transform": "inherit",
          }}
          variant="text"
          size="large"
          onClick={algoMenuClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Algorithms
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={algoMenu}
          open={openAlgoMenu}
          onClose={algoMenuClose}
        >
          <MenuItem onClick={algoMenuClose}>Dijkstra</MenuItem>
        </Menu>
      </li>
      <li className="button-wrapper">
        <Button
          sx={{ color: "#fff", "text-transform": "inherit" }}
          variant="text"
          size="large"
          onClick={PatternMenuClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Patterns
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={patternMenu}
          open={openPatternMenu}
          onClose={PatternMenuClose}
        >
          <MenuItem onClick={PatternMenuClose}>Testing</MenuItem>
        </Menu>
      </li>
      <li className="button-wrapper">
        <Button variant="contained" size="large" onClick={runDijkstra}>
          Start Maze!
        </Button>
      </li>
      <li className="button-wrapper">
        <Button
          sx={{ color: "#fff", "text-transform": "inherit" }}
          variant="text"
          size="large"
        >
          Add Bomb
        </Button>
      </li>
      <li className="button-wrapper">
        <Button
          sx={{ color: "#fff", "text-transform": "inherit" }}
          variant="text"
          size="large"
        >
          Clear Board
        </Button>
      </li>
    </nav>
  );
}
