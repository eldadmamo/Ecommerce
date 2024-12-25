import Menu from './../component/Menu';
import {useParams} from 'react-router-dom';


const AboutPage = () => {
    let {id,name} = useParams()
    return (
        <div>
            <Menu/>
            <h1>This is About Page</h1>
            <p>Id : {id}</p>
            <p>name: {name}  </p>
        </div>
    );
};

export default AboutPage;