import {useState, useEffect}  from 'react';
import HttpCommon from '../../lib/HttpCommon';
import AlertError from '../common/AlertError'
import AlertSuccess from '../common/AlertSuccess'
import Crud from './Crud';
import CrudIndex from './CrudIndex';
import ShowModal from './ShowModal';
import EditModal from './EditModal';
//
const ALERT_ERROS_ID = "alert_error_id_1";
const ALERT_SUCCESS_ID = "alert_success_id_1";
const ERROS_MESSAGE_1 = "Error, title input";
let SUCCESS_MESSAGE_1 = "OK, Save";
//
//
let pageItem: any[] = [];
let todoItem: any = {};
let pageId = 0;
//
function Page () {
    const [updatetime, setUpdatetime] = useState<string>("");
    //
    const updateTimestap = function() {
        const dt = new Date().toString();
        setUpdatetime(dt);
    }
    //
    useEffect(() => {
        (async () => {
            getList();
        })()

    }, []);
    /**
     *
     * @param
     *
     * @return
     */
    const getList = async function() {
        try{
            const d = await CrudIndex.getList()
            pageItem = d;
            updateTimestap();
        } catch (e) {
            console.error(e);
        } 
    }
    /**
     *
     * @param
     *
     * @return
     */
    const createTodo = async function() {
        try{
            SUCCESS_MESSAGE_1 = "OK, Save";
            const result = await CrudIndex.addItem(ALERT_ERROS_ID);
            if(result) {
                getList();
                CrudIndex.displayAlert(ALERT_SUCCESS_ID)
            }
        } catch (e) {
            console.error(e);
        } 
    }
    /**
     *
     * @param
     *
     * @return
     */
    const todoDelete = async function(id: number) {
        try{
            SUCCESS_MESSAGE_1 = "OK, Delete";
            const result = await CrudIndex.delete(id);
            if(result) {
                CrudIndex.displayAlert(ALERT_SUCCESS_ID)
                getList();
            }
        } catch (e) {
            console.error(e);
        } 
    }
    /**
     *
     * @param
     *
     * @return
     */    
    const openShow = async function (id: number) {
        try{
            pageId = id;
            const postItem: any = {
                "id": Number(id)
            };    
            const json = await HttpCommon.server_post(postItem, "/todos/get");
//console.log(json.data);
            todoItem = json.data;
            updateTimestap();            
            //@ts-ignore
            MicroModal.show(Crud.modalIdName.show);
        } catch (e) {
          console.error(e);
        }
    }   
    /**
     *
     * @param
     *
     * @return
     */     
    const openEdit = async function (id: number) {
        try{
            pageId = id;
            const postItem: any = {
                "id": Number(id)
            };    
            const json = await HttpCommon.server_post(postItem, "/todos/get");
//console.log(json.data);
            todoItem = json.data;
            updateTimestap();            
            //@ts-ignore
            MicroModal.show(Crud.modalIdName.edit);
        } catch (e) {
          console.error(e);
        }
    }         
console.log(updatetime);
    //
    return (
    <div><h3>Todo</h3>
        <span className="d-none">{updatetime}</span>
        <hr />
        <div className="col-sm-12">
            <label>Title: <input id="title" className="form-control" /></label>
            <label className="ms-2">Content: 
                <textarea id="content" name="content"  className="form-control" rows={4}
                placeholder="" ></textarea>
            </label>        
            <button onClick={()=>createTodo()} className="btn btn-sm btn-primary ms-2" 
                >Create</button>        
            </div>
        <hr />
        {pageItem.map((item: any ,index: number) => {
        return (
        <div key={index}>
            <h3>{item.title}</h3>
            <span>ID: {item.id}, {item.createdAt}</span>
            <button onClick={()=>openShow(item.id)} className="btn btn-sm btn-outline-primary ms-2">Show
            </button>
            <button onClick={()=>openEdit(item.id)} className="btn btn-sm btn-outline-primary ms-2">Edit
            </button>
            <button onClick={()=>todoDelete(item.id)} className="btn btn-sm btn-outline-danger ms-2" 
            >Delete</button>
            <hr />
        </div>
        )
        })}
        {/* Alert */}
        <AlertError idName={ALERT_ERROS_ID} message={ERROS_MESSAGE_1} />  
        <AlertSuccess idName={ALERT_SUCCESS_ID} message={SUCCESS_MESSAGE_1} />  
        {/*  modal */}
        <ShowModal pageId={pageId} pageItem={todoItem} />            
        <EditModal pageId={pageId} pageItem={todoItem} />            
    </div>    
    );
}
export default Page;
