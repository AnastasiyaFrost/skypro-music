import React, { ChangeEvent } from "react";
import styles from "./VolumeBar.module.css";
import classNames from "classnames";

type VolumeBarType = {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const VolumeBar = React.memo(({
  min,
  max,
  step,
  value,
  onChange,
}: VolumeBarType) => {
  return (
    <input
      className={classNames(styles.volumeProgressLine, styles.btn)}
      type="range"
      name="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
    />
  );
})
VolumeBar.displayName = "VolumeBar";
export default VolumeBar;
