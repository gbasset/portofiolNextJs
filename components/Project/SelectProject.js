import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export default function SelectProject({ listProject, filteredProjects }) {
    const animatedComponents = makeAnimated();
    const [valueProjectSelected, setvalueProjectSelected] = useState([]);

    const handleSelectChange = (e) => {
        setvalueProjectSelected([...e])
        filteredProjects([...e])
    }

    console.log("valueProjectSelected", valueProjectSelected);
    return (
        <div>
            <Select
                closeMenuOnSelect={true}
                value={valueProjectSelected && valueProjectSelected}
                components={animatedComponents}
                styles={{ menuPortal: base => ({ ...base, zIndex: 10000 }) }}
                menuPosition={"fixed"}
                isMulti
                options={listProject}
                placeholder={"Selectionner des projects"}
                onChange={handleSelectChange}
            />
        </div>
    )
}
