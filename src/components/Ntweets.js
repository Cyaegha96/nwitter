import { dbService, storageService } from "fbase";
import { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {

    const [editing, setEditing] = useState(false); //수정 버튼 클릭시 입력란과 버튼이 나타나는 기준점 ; 토글상태
    const [newNweet, setNewNweet] = useState(nweetObj.text); //


    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        if (ok) {

            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            if (nweetObj.attachmentUrl !== "")
                await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    }

    const toggleEditing = () => setEditing((prev) => !prev);

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewNweet(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({ text: newNweet });
        setEditing(false);
    }

    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input
                            value={newNweet}
                            onChange={onChange}
                            required />
                        <input
                            type="submit"
                            value="Update Nweet"

                        />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>

            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && (<img src={nweetObj.attachmentUrl} width="100px" height="100px" alt="img unloaded" />
                    )}
                    {
                        isOwner && (
                            <>
                                <button onClick={onDeleteClick}>Delete Nweet</button>
                                <button onClick={toggleEditing}>Update Nweet</button>
                            </>
                        )
                    }
                </>
            )}
        </div>
    );
};

export default Nweet;