import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
    const navigate = useNavigate();

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                // Redirect the user to the home page
                // note we can use navigate (which has side effects)
                // becasue we are using it in an event handler
                navigate('/');
            }}
        >
            <button className="btn btn-primary">Submit</button>
        </form>
    );
};

export default ContactPage;
