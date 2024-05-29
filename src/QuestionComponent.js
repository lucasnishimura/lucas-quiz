import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './App.css';

export const QuestionComponent = ({ pergunta, answers, index, handleRadio, ...rest }) => {
  return (
    <FormControl className="centralize-questions">
      <FormLabel id="demo-radio-buttons-group-label" className="question">{pergunta}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        onChange={handleRadio}
      >
        {answers.map((element) => (
          <FormControlLabel value={element+`|`+index} control={<Radio />} label={element} />
        ))}

      </RadioGroup>
    </FormControl>
  );
}

export default QuestionComponent;