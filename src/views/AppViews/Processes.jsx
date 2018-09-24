import '../../assets/css/app/app.css'
import React from "react";

import ProcessList from './Process/ProcessList.jsx'
import ProcessCreate from './Process/ProcessCreate.jsx'
import ProcessRead from './Process/ProcessRead.jsx'
import ProcessUpdate from './Process/ProcessUpdate.jsx'
import ProcessDelete from './Process/ProcessDelete.jsx'


class Processes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentMode: 'process-list',
            currentId: null
        }
    }

    changeMode = (newMode, newId) => {
        if (newId !== undefined) {
            this.setState({
                currentMode: newMode,
                currentId: newId
            })
        } else {
            this.setState({
                currentMode: newMode
            })
        }
    }

    render() {

        let component = <ProcessList changeMode={this.changeMode} />
        switch (this.state.currentMode) {
            case 'process-list':
                break
            case 'process-create':
                component = <ProcessCreate changeMode={this.changeMode} />
                break
            case 'process-read':
                component = <ProcessRead id={this.state.currentId} changeMode={this.changeMode} />
                break
            case 'process-update':
                component = <ProcessUpdate id={this.state.currentId} changeMode={this.changeMode} />
                break
            case 'process-delete':
                component = <ProcessDelete id={this.state.currentId} changeMode={this.changeMode} />
                break
            default:
                break
        }
        return component
    }

}

export default Processes;






