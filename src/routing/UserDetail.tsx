import { useLocation, useParams, useSearchParams } from 'react-router-dom';

const UserDetail = () => {
    //The hooks below allow us to get various information about the current route

    // extract params from url
    // e.g. /users/1/2 => 1 and 2 apre the params
    //>> const params = useParams();
    //
    // extract querysting params
    // eg /users?id=1&name=jest => id=1 and name=jest are the query string params
    //>> const [searchParams, setSearchParams] = useSearchParams();
    //>> const id = searchParams.get('id'); // retrieve values from query string
    //>> const name = searchParams.get('name');
    // IMPORTANT: if you want to update the query string params, use setSearchParams()
    // BUT ONLY INSIDE an effect) or similar or in event handlers.  That is because
    // this function has side effets and recall that compoents should be pure
    //
    // Access our current location
    //>> const location = useLocation();

    const { id } = useParams();

    return <p>User {id ?? 'does not exist'}</p>;
};

export default UserDetail;
