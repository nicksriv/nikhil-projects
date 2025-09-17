import React from 'react'
import { Chip, Typography } from '@material-ui/core'

const RenderSkills = (props) => {
    const { skillCategories } = props
    return (
        <div>
            {skillCategories && skillCategories.length ? (
                skillCategories.map((s, i) => {
                    return (
                        <>
                            <Typography
                                variant="p"
                                style={{
                                    fontWeight: 'bold',
                                    minWidth: '180px',
                                    textTransform: 'capitalize',
                                }}
                            >
                                {s.name}:
                            </Typography>
                            {s.skills.map((sk, i) => {
                                return (
                                    <Chip
                                        size="small"
                                        label={sk.name}
                                        color="#FFFFFF"
                                        variant="outlined"
                                        className="m-1"
                                    />
                                )
                            })}
                            <br />
                        </>
                    )
                })
            ) : (
                <Typography variant='p'>No Skills Available</Typography>
            )}
        </div>
    )
}

export default RenderSkills
