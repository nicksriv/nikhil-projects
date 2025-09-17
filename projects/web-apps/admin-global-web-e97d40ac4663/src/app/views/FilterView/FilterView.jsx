import React, {useState, useRef } from 'react';
import { Button, ClickAwayListener, Tooltip } from '@material-ui/core';
import { PopoverMenu } from 'app/components';

const FilterView = () => {
    const [isOpen, setIsOpen] = useState(false);
    const anchorRef = useRef(null);

    return (
        <div className="flex justify-end">
            <Tooltip title="Filter" placement="bottom">
                <div>
                    <Button
                        ref={anchorRef}
                        onClick={()=>setIsOpen(true)}
                        color={isOpen ? 'primary' : 'default'}
                    >
                        Filter
                    </Button>
                </div>
            </Tooltip>

            <PopoverMenu
                width={360}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                anchorEl={anchorRef.current}
            >
                <ClickAwayListener onClickAway={() => setIsOpen(false)}>
                    {/* Keep your code here */}
                    <div>
                        
                    </div>
                </ClickAwayListener>
            </PopoverMenu>
        </div>
    )
}

export default FilterView;
