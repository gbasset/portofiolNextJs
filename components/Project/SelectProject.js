import React, { useMemo, useState } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import classes from './SelectProject.module.css'

export default function SelectProject({ listProject, filteredProjects }) {
    const animatedComponents = useMemo(() => makeAnimated(), []);
    const [valueProjectSelected, setvalueProjectSelected] = useState([]);

    const handleSelectChange = (selectedValues) => {
        const nextSelection = selectedValues ? [...selectedValues] : [];
        setvalueProjectSelected(nextSelection)
        filteredProjects(nextSelection)
    }

    const customStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: '54px',
            borderRadius: '14px',
            border: state.isFocused ? '2px solid #F2D1A6' : '2px solid rgba(235, 184, 118, 0.65)',
            backgroundColor: 'rgba(31, 34, 53, 0.82)',
            boxShadow: state.isFocused ? '0 0 0 3px rgba(242, 209, 166, 0.22)' : '0 10px 30px -20px rgba(0, 0, 0, 0.85)',
            transition: 'all 180ms ease',
            '&:hover': { borderColor: '#F2D1A6' },
        }),
        valueContainer: (base) => ({
            ...base,
            padding: '6px 12px',
            gap: '6px',
        }),
        menu: (base) => ({
            ...base,
            overflow: 'hidden',
            border: '1px solid rgba(235, 184, 118, 0.45)',
            borderRadius: '12px',
            backgroundColor: '#1F2235',
        }),
        menuList: (base) => ({
            ...base,
            padding: '6px',
        }),
        option: (base, state) => ({
            ...base,
            borderRadius: '8px',
            marginBottom: '4px',
            fontWeight: 600,
            color: state.isSelected ? '#1F2235' : '#FFF9F2',
            backgroundColor: state.isSelected ? '#EBB876' : state.isFocused ? 'rgba(235, 184, 118, 0.22)' : 'transparent',
            cursor: 'pointer',
        }),
        multiValue: (base) => ({
            ...base,
            borderRadius: '999px',
            backgroundColor: 'rgba(235, 184, 118, 0.22)',
            border: '1px solid rgba(235, 184, 118, 0.55)',
            paddingLeft: '6px',
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: '#F2D1A6',
            fontWeight: 600,
            fontSize: '0.75rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
        }),
        multiValueRemove: (base) => ({
            ...base,
            color: '#F2D1A6',
            borderRadius: '999px',
            ':hover': {
                backgroundColor: 'rgba(235, 184, 118, 0.35)',
                color: '#FFF9F2',
            },
        }),
        placeholder: (base) => ({
            ...base,
            color: 'rgba(255, 249, 242, 0.72)',
            fontSize: '0.9rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
        }),
        input: (base) => ({
            ...base,
            color: '#FFF9F2',
        }),
        indicatorSeparator: (base) => ({
            ...base,
            backgroundColor: 'rgba(235, 184, 118, 0.4)',
        }),
        dropdownIndicator: (base, state) => ({
            ...base,
            color: state.isFocused ? '#F2D1A6' : 'rgba(242, 209, 166, 0.78)',
            ':hover': { color: '#F2D1A6' },
        }),
        clearIndicator: (base) => ({
            ...base,
            color: 'rgba(242, 209, 166, 0.8)',
            ':hover': { color: '#FFF9F2' },
        }),
        noOptionsMessage: (base) => ({
            ...base,
            color: 'rgba(255, 249, 242, 0.72)',
        }),
    };

    return (
        <div className={classes.selectContainer}>
            <Select
                closeMenuOnSelect={true}
                value={valueProjectSelected && valueProjectSelected}
                components={animatedComponents}
                styles={customStyles}
                classNamePrefix="project-select"
                isMulti
                options={listProject}
                isClearable
                noOptionsMessage={() => 'Aucun theme correspondant'}
                placeholder={"Trier par themes, tags ou technos (ex: back office, cinema, react...)"}
                onChange={handleSelectChange}
            />
        </div>
    )
}
