/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.master.category;

import com.supervision.wms.app.master.category.model.Category;
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
@RequestMapping("/api/wms/master/category")
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;
    
    @RequestMapping(value = "/find-all-category" , method = RequestMethod.GET)
    public List<Category> getAllCategory(){
        return categoryService.getAllCategory();
    }
    @RequestMapping(value = "/save-category" , method = RequestMethod.POST)
    public Category saveCategory(@RequestBody Category category){
        return categoryService.saveCategory(category);
    }
    @RequestMapping(value = "/delete-category/{indexNo}" , method = RequestMethod.DELETE)
    public void deleteCategory(@PathVariable Integer indexNo){
         categoryService.deleteCategory(indexNo);
    }
}
