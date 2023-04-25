import User from "../models/Users";

//READ
export const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch(err) {
        res.status(404).json({ message: err.message});
    }
}

export const getUserFriends = async (res, req) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);

        // multiple api calls
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({_id, firtName, lastName, occupation, location, picturePath }) => {
                return { _id, firtName, lastName, occupation, location, picturePath };
            }
        )
        res.status(200).json(formattedFriends);
    } catch(err) {
        res.status(404).json({ message: err.message});
    }
}

//UPDATE

export const addRemoveFriend = async (res, que) => {
    try{
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId)
            friend.friends = friend.friends.filter((id) => id !== id)
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save()

        // multiple api calls
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({_id, firtName, lastName, occupation, location, picturePath }) => {
                return { _id, firtName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFriends);

    } catch(err) {
        res.status(404).json({ message: err.message});
    }
}