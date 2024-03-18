import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SkillsForm.scss';

const SkillsForm = ({ skills, onChange, onRemove, selectedSkills }) => {
  const addSkill = (skill) => {
    if (!selectedSkills.includes(skill.id)) {
      onChange(skill);
    }
  };

  const removeSkill = (skill) => {
    if (selectedSkills.includes(skill.id)) {
      onRemove(skill);
    }
  };

  return (
    <div className="skills-container">
      <div className="selected-skills">
        {skills
          .filter((skill) => selectedSkills.includes(skill.id))
          .map((skill) => (
            <div key={skill.id} className="skill-tag cross" onClick={() => removeSkill(skill)}>
              <span className="text">{skill.name}</span>
            </div>
          ))}
      </div>
      <div className="available-skills">
        {skills
          .filter((skill) => !selectedSkills.includes(skill.id))
          .map((skill) => (
            <div key={skill.id} className="skill-tag tick" onClick={() => addSkill(skill)}>
              {skill.name}
            </div>
          ))}
      </div>
    </div>
  );
};

SkillsForm.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  selectedSkills: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default SkillsForm;
