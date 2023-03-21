// 會用到dao 去db 找raw data，透過dataModel轉成domain object，或反過來

export default interface Repository {
    findById();

    save();

    saveAndBroadcast();
}