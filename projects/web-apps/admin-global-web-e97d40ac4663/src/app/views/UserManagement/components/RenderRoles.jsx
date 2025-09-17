import React from 'react'
import { Chip, Typography } from '@material-ui/core'

const RenderRoles = (props) => {
    const { roleCategories } = props
    return (
        <div className='mt-2'>
            <Typography
                variant="p"
                style={{
                    fontWeight: 'bold',
                    minWidth: '180px',
                    textTransform: 'capitalize',
                }}
            >
                Roles:
            </Typography>
            {roleCategories && roleCategories.length ? (
                roleCategories.map((s, i) => {

                    return (typeof (s) === 'string') ? <Chip
                        size="small"
                        label={s}
                        color="#FFFFFF"
                        variant="outlined"
                        className="m-1 ml-3"
                    /> : <Chip
                        size="small"
                        label={s.name}
                        color="#FFFFFF"
                        variant="outlined"
                        className="m-1 ml-3"
                    />



                })
            ) : (
                <Typography variant='p' className='ml-4'>No Roles Available</Typography>
            )}
        </div>
    )
}

export default RenderRoles
