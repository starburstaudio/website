import React from "react";

class CheckOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: this.props.options,
            value: "",
        };
    }

    render() {
        return (
            <div className="space-y-2">
                {this.state.options.map(r => (
                    <div
                        className={
                            "form-control check-select " +
                            (this.state.value == r.value ? "bg-primary hover:bg-primary-focus " : "bg-base-100 hover:bg-base-200 ")
                        }
                        onClick={
                            ()=>{
                                if(this.state.value == r.value)
                                    this.setState({value: ""})
                                else
                                    this.setState({value: r.value})
                            }
                        }
                    >
                        <label className="label cursor-pointer">
                            <span
                                className=
                                {
                                    "label-text flex gap-2 font-bold " + 
                                    (this.state.value == r.value ? "text-white" : "")
                                }
                            >
                                {r.jsx}
                            </span> 
                        </label>
                    </div>
                ))}
            </div>
        );
    }
}

export default CheckOptions;