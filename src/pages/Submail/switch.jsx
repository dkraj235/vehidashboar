import * as React from "react";
import Switch from "@mui/material/Switch";

export default function Switcher() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    if (isChecked) {
      console.log("Switch is checked!");
    }
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}
