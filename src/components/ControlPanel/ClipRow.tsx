import { RangeSlider } from "@blueprintjs/core";
import DotProp from 'dot-prop-immutable';
import React from "react";
import { GoRecord } from "../../goban/model/goban";
import './ClipRow.css';

interface Props {
  record: GoRecord;
  setRecord: (record: GoRecord) => void;
}

export const ClipRow = React.memo(({
  record,
  setRecord,
}: Props) => {

  const onChangeWidth = (values: [number, number]) => {
    let newRecord = record;
    newRecord = DotProp.set(newRecord, 'clipRegion.left', values[0] - 1);
    newRecord = DotProp.set(newRecord, 'clipRegion.right', values[1] - 1);
    setRecord(newRecord);
  }

  const onChangeHeight = (values: [number, number]) => {
    let newRecord = record;
    newRecord = DotProp.set(newRecord, 'clipRegion.top', values[0] - 1);
    newRecord = DotProp.set(newRecord, 'clipRegion.bottom', values[1] - 1);
    setRecord(newRecord);
  }

  const { clipRegion } = record;
  const widthValue: [number, number] = [
    (clipRegion?.left ?? 0) + 1,
    (clipRegion?.right ?? (record.size - 1)) + 1,
  ];
  const heightValue: [number, number] = [
    (clipRegion!.top ?? 0) + 1,
    (clipRegion!.bottom ?? (record.size - 1)) + 1,
  ];
  return (
    <div className='clip-row'>
      <div className='slider-column'>
        <div className='width-row'>
          <div className='name-container'> Width </div>
          <RangeSlider
            min={1}
            max={record.size}
            stepSize={1}
            labelStepSize={5}
            onChange={onChangeWidth}
            value={widthValue}
          />
        </div>
        <div className='height-row'>
          <div className='name-container'> Height </div>
          <RangeSlider
            min={1}
            max={record.size}
            stepSize={1}
            labelStepSize={5}
            onChange={onChangeHeight}
            value={heightValue}
          />
        </div>
      </div>
    </div>
  )
});
