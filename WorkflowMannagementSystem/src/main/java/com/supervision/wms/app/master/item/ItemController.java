/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.master.item;

import com.supervision.wms.app.master.item.model.Item;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Thilina Kalum
 */
@RestController
@CrossOrigin
@RequestMapping("/api/wms/master/item")
public class ItemController {
    
    @Autowired
    private ItemService itemService;
    
    @RequestMapping(value = "/find-all-item" , method = RequestMethod.GET)
    public List<Item> getAllItems(){
        return itemService.getAllItem();
    }
    @RequestMapping(value = "/save-item" , method = RequestMethod.POST)
    public Item saveItem(@RequestBody Item item){
        return itemService.saveItem(item);
    }
    @RequestMapping(value = "/delete-item/{indexNo}" , method = RequestMethod.DELETE)
    public void deleteItem(@PathVariable Integer indexNo){
        itemService.deleteItem(indexNo);
    }
}
