/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.master.item;

import com.supervision.wms.app.master.item.model.Item;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Thilina Kalum
 */
@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;
    
    public List<Item> getAllItem() {
        return itemRepository.findAll();
    }

    public Item saveItem(Item item) {
        return itemRepository.save(item);
    }
    
}
