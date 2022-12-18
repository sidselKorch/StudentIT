import Parse from 'parse';

const l = console.log

export async function createChatList(firstname, lastname, email, coursetitle) {
    const List = Parse.Object.extend("Chat")
    const list = new List()
    // l(list)
    let usersRelation = list.relation("users")
    usersRelation.add(Parse.User.current())
    list.set("firstName", firstname)
    list.set("lastName", lastname)
    list.set("email", email)
    list.set("courseTitle", coursetitle)
        try {
            const savedList = await list.save()
            l("CreateChatList(): ",savedList)
            return savedList
        } catch (error) {
            l("CreateChatList(): ",error)
        }
}

export async function addUserToChatList(email, chatid) {
    const user = await getUser(email)
    // l(list)
    let usersRelation = chatid.relation("users")
    usersRelation.add(user)
    try {
        const savedList = await chatid.save()
        l("addUserToChatList(): ",savedList)
    } catch (error) {
        l("addUserToChatList(): ",error)
    }
}

export async function getCurrentUserLists() {
    const query = new Parse.Query("Chat")
    query.include("users", Parse.User.current())
    try {
        const lists = await query.find()
        l("getCurrentUserLists(): ",lists)
        return lists
    } catch (error) {
        l("getCurrentUserLists(): ",error)
    }
}

export async function removeUserFromChatList(email, chatid) {
    const user = await getUser(email)
    let usersRelation = chatid.relation("users")
    usersRelation.remove(user)
    try {
        const savedList = await chatid.save()
        l("removeUserFromList(): ",savedList)
    } catch (error) {
        l("removeUserFromList(): ",error)
    }
}

async function getChatListObject(chatid) {
    const chatListQuery = new Parse.Query("Chat")
    chatListQuery.equalTo("objectId", chatid)
    try {
        const list = await chatListQuery.first()
        l("getListObject(): ",list)
        return list
    } catch (error) {
        l("getListObject(): ",error)
    }
}

// Create or retrieve User name objects and start LiveChat component
const startLiveChat = async () => {
    // Check if sender name already exists, if not create new parse object
    let receiverNameObject = null;
    let receiverGroupObject = [];
    let senderNameObject = null;
    try {
      const senderParseQuery = new Parse.Query("User");
      senderParseQuery.equalTo("objectId", currentUser.id);
      const senderParseQueryResult = await senderParseQuery.first();
      if (
        senderParseQueryResult !== undefined &&
        senderParseQueryResult !== null
      ) {
        senderNameObject = senderParseQueryResult;
      } else {
        senderNameObject = new Parse.Object("User");
        senderNameObject.set("objectId", currentUser.id);
        senderNameObject = await senderNameObject.save();
      }
    } catch (error) {
      alert(error);
      return false;
    }
    setSenderNameId(senderNameObject.id);
    console.log("sender", senderNameId)

    if(ReceiverId[1] === "User"){
    // Check if receiver name already exists, if not create new parse object
    try {
      const receiverParseQuery = new Parse.Query("User");
      receiverParseQuery.equalTo("objectId", ReceiverId[0]);
      const receiverParseQueryResult = await receiverParseQuery.first();
      if (
        receiverParseQueryResult !== undefined &&
        receiverParseQueryResult !== null
      ) {
        receiverNameObject = receiverParseQueryResult;
      } else {
        receiverNameObject = new Parse.Object("User");
        receiverNameObject.set("objectId", ReceiverId[0]);
        receiverNameObject = await receiverNameObject.save();
      }
    } catch (error) {
      alert(error);
      return false;
    }
    setReceiverNameId(receiverNameObject.id); 
    console.log("One receiver", receiverNameId)
  } else {
    try {
      const receiverParseQuery = new Parse.Query("User");
      receiverParseQuery.equalTo("group", ReceiverId[0]);
      const receiverParseQueryResult = await receiverParseQuery.find();
      if (
        receiverParseQueryResult !== undefined &&
        receiverParseQueryResult !== null
      ) {
        receiverGroupObject = receiverParseQueryResult;
        console.log("recieverGroupObject", receiverGroupObject)
      
      } else {
        receiverGroupObject = new Parse.Object("User");
        receiverGroupObject.set("group", ReceiverId[0]);
        receiverGroupObject = await receiverNameObject.save();
      }
    } catch (error) {
      alert(error);
      return false;
    }
    for( let object in receiverGroupObject){
      let userGroupRelation = object.relaion("User")
      
      setReceiverGroup(object.id);}
      console.log("Group receiver", receiverGroup)
  }
    // Set name objects ids, so live chat component is instantiated
    return true;
  };


