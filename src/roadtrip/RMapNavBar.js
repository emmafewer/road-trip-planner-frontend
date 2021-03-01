import React from 'react'
import Button from '@material-ui/core/Button';

const RMapNavBar = (props) => {
    return (
        <div className="rMapNav">
            <Button 
            variant="contained" 
            color="secondary"
            type="submit"
            >
                Map
            </Button>

            <Button 
            variant="contained" 
            color="secondary"
            type="submit"
            >
                Calendar
            </Button>

            <Button 
            variant="contained" 
            color="primary"
            type="submit"
            >
                Notes
            </Button>
        </div>
    )
}

export default RMapNavBar