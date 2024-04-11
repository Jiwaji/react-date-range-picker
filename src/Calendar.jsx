import CalendarComponent from './CalendarComponent';

export default function Calendar({ onChange, onSubmit }) {
    return (
        <div className='main-container'>
            <div className='calendars'>
                <div className='mdp-container left'>
                    <CalendarComponent onChange={onChange} type="start" defaultDate />
                </div>

                <div className='mdp-container right'>
                    <CalendarComponent onChange={onChange} type="end" />
                </div>
            </div>
            <div className='button-group'>
                <div className='defined-ranges'>
                    <button>Last 7 days</button>
                    <button>Last 30 days</button>
                </div>
                <button onClick={() => onSubmit()}>OK</button>
            </div>
        </div>
    )
}