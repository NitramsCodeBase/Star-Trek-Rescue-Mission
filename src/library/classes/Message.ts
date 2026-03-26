import { soundTable } from '../configuration/Configuration';

enum Notication {
    QuitGame = 0,
    UnderDevelopment = 1,
    StartGame = 2,
    QuitRescueMission = 3
}

class Message {
    public static showMessage = (message: Notication): void => {
        switch (message.valueOf()) {
            case Notication.UnderDevelopment: {
                soundTable.theme.stop();
                soundTable.redalert.play();

                alert('This function is currently under development');
                break;
            }
            case Notication.QuitGame: {
                soundTable.theme.stop();
                soundTable.redalert.play();

                const result = window.confirm('Do you want to quit Star Trek Rescue Mission ? ');

                if (result)
                    window.close();

                break;
            }
            case Notication.StartGame: {

                break;
            }
            case Notication.QuitRescueMission: {
                soundTable.theme.stop();
                soundTable.redalert.play();

                const result = window.confirm('Do you want to quit Star Trek Rescue Mission ? ');

                if (result)
                    window.location.href='./index.html';
                    
                break;
            }
        }
    }
}

export { Message, Notication };