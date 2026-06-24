interface Props {
    onClickEvent: (e: any) => void;
    onMouseMoveEvent: () => void;
}

const TitleScreenButtons = ({ onClickEvent, onMouseMoveEvent }: Props) => {
    const showSettings: boolean = false;

    type Buttons = {
        name: string;
        title: string;
    }

    const buttons: Buttons[] = [
        {
            name: 'start',
            title: 'BEGIN YOUR RESCUE MISSION'
        },
        {
            name: 'about',
            title: 'ABOUT STAR TREK RESCUE MISSION'
        },
        {
            name: 'howtoplay',
            title: 'HOW TO PLAY'
        },
        {
            name: 'quitmission',
            title: 'QUIT THE MISSION',
        },
        {
            name: 'settings',
            title: 'SETTINGS'
        }
    ];

    return (
        <div className='button-container'>
            {buttons.map((button, index) => {

                if (!showSettings && index === 4 || index == 3) 
                    return;

                const buttonTag = `button-${index}`;
                return (
                    <button
                        key={buttonTag}
                        name={button.name}
                        onClick={(e) => onClickEvent(e)}
                        onMouseMove={onMouseMoveEvent}
                    > {button.title} </button>
                );
            })}
        </div>
    );
}

export { TitleScreenButtons };