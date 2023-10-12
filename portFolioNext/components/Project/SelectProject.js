import React, { useEffect, useState } from 'react'
import { BsFillBackspaceReverseFill } from 'react-icons/bs';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import classes from './SelectProject.module.css'

export default function SelectProject({ listProject, filteredProjects }) {
    const animatedComponents = makeAnimated();
    const [valueProjectSelected, setvalueProjectSelected] = useState([]);

    const handleSelectChange = (e) => {
        setvalueProjectSelected([...e])
        filteredProjects([...e])
    }
    const customStyles = {
        control: (base, state) => ({
            ...base,
            color: 'black',
            '&:hover': { borderColor: '#F2D1A6' },
            boxShadow: "none",
            border: '3px solid #EBB876', // default border color

            // You can also use state.isFocused to conditionally style based on the focus state
        }),
        option: (provided, state) => ({
            ...provided,
            fontWeight: 'bold',
            color: 'var(--color-primary-700)',
            backgroundColor: 'var(--color-grey-100)',

        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: 'red',
        })
    };
    return (
        <div className={classes.selectContainer}>
            <Select
                closeMenuOnSelect={true}
                value={valueProjectSelected && valueProjectSelected}
                components={animatedComponents}
                styles={customStyles}
                // menuPosition={"fixed"}
                isMulti
                options={listProject}
                placeholder={"Selectionner des projects"}
                onChange={handleSelectChange}
            />
        </div>
    )
}
